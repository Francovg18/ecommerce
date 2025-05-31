from django.shortcuts import render
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.cart.models import Cart, CartItem
from apps.coupons.models import FixedPriceCoupon, PercentageCoupon
from apps.orders.models import Order, OrderItem
from apps.product.models import Product
from apps.branches.models import Sucursal
from apps.shipping.models import Shipping
from django.core.mail import send_mail
import braintree
from apps.branches.models import StockPorSucursal

gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        environment=settings.BT_ENVIRONMENT,
        merchant_id=settings.BT_MERCHANT_ID,
        public_key=settings.BT_PUBLIC_KEY,
        private_key=settings.BT_PRIVATE_KEY
    )
)


class GenerateTokenView(APIView):
    def get(self, request, format=None):
        try:
            token = gateway.client_token.generate()

            return Response(
                {'braintree_token': token},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Algo salió mal al recuperar el token de Braintree'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class GetPaymentTotalView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        tax = 0.0

        shipping_id = request.query_params.get('shipping_id')
        shipping_id = str(shipping_id)

        coupon_name = request.query_params.get('coupon_name')
        coupon_name = str(coupon_name)

        try:
            cart = Cart.objects.get(user=user)

            # revisar si existen items
            if not CartItem.objects.filter(cart=cart).exists():
                return Response(
                    {'error': 'Necesitas tener productos en el carrito'},
                    status=status.HTTP_404_NOT_FOUND
                )

            cart_items = CartItem.objects.filter(cart=cart)

            for cart_item in cart_items:
                if not Product.objects.filter(id=cart_item.product.id).exists():
                    return Response(
                        {'error': 'El producto con el ID proporcionado no existe'},
                        status=status.HTTP_404_NOT_FOUND
                    )
                if int(cart_item.count) > int(cart_item.product.quantity):
                    return Response(
                        {'error': 'No hay suficientes productos en stock'},
                        status=status.HTTP_200_OK
                    )

                total_amount = 0.0
                total_compare_amount = 0.0

                for cart_item in cart_items:
                    total_amount += (float(cart_item.product.price)
                                     * float(cart_item.count))
                    total_compare_amount += (float(cart_item.product.compare_price)
                                             * float(cart_item.count))

                total_compare_amount = round(total_compare_amount, 2)
                original_price = round(total_amount, 2)

                # Cupones
                if coupon_name != '':
                    # Revisar si cupon de precio fijo es valido
                    if FixedPriceCoupon.objects.filter(name__iexact=coupon_name).exists():
                        fixed_price_coupon = FixedPriceCoupon.objects.get(
                            name=coupon_name
                        )
                    discount_amount = float(fixed_price_coupon.discount_price)
                    if discount_amount < total_amount:
                        total_amount -= discount_amount
                        total_after_coupon = total_amount

                    elif PercentageCoupon.objects.filter(name__iexact=coupon_name).exists():
                        percentage_coupon = PercentageCoupon.objects.get(
                            name=coupon_name
                        )
                        discount_percentage = float(
                            percentage_coupon.discount_percentage)

                        if discount_percentage > 1 and discount_percentage < 100:
                            total_amount -= (total_amount *
                                             (discount_percentage / 100))
                            total_after_coupon = total_amount

                # Total despues del cupon
                total_after_coupon = round(total_after_coupon, 2)

                # Impuesto estimado
                estimated_tax = round(total_amount * tax, 2)

                total_amount += (total_amount * tax)

                shipping_cost = 0.0
                # verificar que el envio sea valido
                if Shipping.objects.filter(id__iexact=shipping_id).exists():
                    # agregar shipping a total amount
                    shipping = Shipping.objects.get(id=shipping_id)
                    shipping_cost = shipping.price
                    total_amount += float(shipping_cost)

                total_amount = round(total_amount, 2)

                return Response({
                    'original_price': f'{original_price:.2f}',
                    'total_after_coupon': f'{total_after_coupon:.2f}',
                    'total_amount': f'{total_amount:.2f}',
                    'total_compare_amount': f'{total_compare_amount:.2f}',
                    'estimated_tax': f'{estimated_tax:.2f}',
                    'shipping_cost': f'{shipping_cost:.2f}'
                },
                    status=status.HTTP_200_OK
                )

        except:
            return Response(
                {'error': 'Algo salió mal al recuperar la información del total de pago'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ProcessPaymentView(APIView):
    def post(self, request, format=None):
        try:
            user = request.user
            data = request.data
            tax = 0.0

            if 'nonce' not in data or not data['nonce']:
                return Response({'error': 'El nonce del pago es requerido'}, status=status.HTTP_400_BAD_REQUEST)

            nonce = data['nonce']
            shipping_id = str(data['shipping_id'])
            coupon_name = str(data['coupon_name'])

            # Obtener la sucursal de la solicitud
            city = data.get('city', '').strip().lower()  
            sucursal = None  

            # Comparar la solicitud con todas las sucursales
            sucursales = Sucursal.objects.all() 
            for s in sucursales:
                if city == s.nombre.lower(): 
                    sucursal = s
                    break  

            if sucursal is None:
                return Response({'error': 'Sucursal no encontrada'}, status=status.HTTP_404_NOT_FOUND)

            full_name = data['full_name']
            address_line_1 = data['address_line_1']
            address_line_2 = data.get('address_line_2', '')
            state_province_region = data['state_province_region']
            telephone_number = data['telephone_number']
            age = data['age']

            # Validar envío
            if not Shipping.objects.filter(id__iexact=shipping_id).exists():
                return Response({'error': 'Opción de envío no válida'}, status=status.HTTP_404_NOT_FOUND)

            cart = Cart.objects.get(user=user)
            cart_items = CartItem.objects.filter(cart=cart)

            if not cart_items.exists():
                return Response({'error': 'Debes tener productos en el carrito'}, status=status.HTTP_404_NOT_FOUND)

            # Comprobar el stock disponible en la sucursal seleccionada
            for cart_item in cart_items:
                stock_sucursal = StockPorSucursal.objects.filter(
                    producto=cart_item.product, sucursal=sucursal).first()

                if stock_sucursal:
                    stock_disponible = stock_sucursal.cantidad
                    if stock_disponible < cart_item.count:
                        return Response(
                            {'error': f'No hay suficiente stock en la sucursal seleccionada para el producto {cart_item.product.name}. Disponible: {stock_disponible}, Solicitado: {cart_item.count}'}, 
                            status=status.HTTP_200_OK
                        )

            # Calcular total
            total_amount = sum(float(cart_item.product.price) * float(cart_item.count) for cart_item in cart_items)

            # Aplicar cupones
            if coupon_name:
                if FixedPriceCoupon.objects.filter(name__iexact=coupon_name).exists():
                    fixed_price_coupon = FixedPriceCoupon.objects.get(name=coupon_name)
                    discount_amount = float(fixed_price_coupon.discount_price)
                    if discount_amount < total_amount:
                        total_amount -= discount_amount
                elif PercentageCoupon.objects.filter(name__iexact=coupon_name).exists():
                    percentage_coupon = PercentageCoupon.objects.get(name=coupon_name)
                    discount_percentage = float(percentage_coupon.discount_percentage)
                    if 1 <= discount_percentage < 100:
                        total_amount -= (total_amount * (discount_percentage / 100))

            # Envío
            total_amount += (total_amount * tax)
            shipping = Shipping.objects.get(id=int(shipping_id))
            shipping_name = shipping.name
            shipping_time = shipping.time_to_delivery
            shipping_price = float(shipping.price)
            total_amount += shipping_price
            total_amount = round(total_amount, 2)

            # Procesar pago: QR , Braintree
            if isinstance(nonce, str) and nonce.startswith("qr-payment-completed-"):
                transaction_id = nonce
                is_qr_payment = True
            else:
                is_qr_payment = False
                try:
                    newTransaction = gateway.transaction.sale({
                        'amount': str(total_amount),
                        'payment_method_nonce': str(nonce['nonce']),
                        'options': {'submit_for_settlement': True}
                    })
                    if not (newTransaction.is_success or newTransaction.transaction):
                        return Response({'error': 'La transacción falló'}, status=status.HTTP_400_BAD_REQUEST)
                    transaction_id = newTransaction.transaction.id
                except Exception as e:
                    return Response({'error': 'Error procesando la transacción'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Validar transacción
            if is_qr_payment or (newTransaction.is_success or newTransaction.transaction):
                # Actualizar inventario
                for cart_item in cart_items:
                    product = Product.objects.get(id=cart_item.product.id)
                    product.quantity -= cart_item.count
                    stock_sucursal = StockPorSucursal.objects.get(
                        producto=product, sucursal=sucursal)
                    stock_sucursal.cantidad -= cart_item.count
                    product.sold += cart_item.count
                    product.save()
                    stock_sucursal.save()

                # Crear orden
                order = Order.objects.create(
                    user=user,
                    transaction_id=transaction_id,
                    amount=total_amount,
                    full_name=full_name,
                    address_line_1=address_line_1,
                    address_line_2=address_line_2,
                    city=city,
                    state_province_region=state_province_region,
                    age=age,
                    telephone_number=telephone_number,
                    shipping_name=shipping_name,
                    shipping_time=shipping_time,
                    shipping_price=shipping_price
                )

                # Crear items de orden
                for cart_item in cart_items:
                    OrderItem.objects.create(
                        product=cart_item.product,
                        order=order,
                        name=cart_item.product.name,
                        price=cart_item.product.price,
                        count=cart_item.count
                    )

                # Enviar correo
                send_mail(
                    'Detalles de tu pedido',
                    f"Hola {full_name},\n\nHemos recibido tu pedido!\n\n"
                    "Nos tomará un poco de tiempo procesarlo y enviarlo a tu dirección.\n\n"
                    "Puedes verificar el estado de tu pedido en tu panel de usuario.\n\n"
                    "Atentamente,\nShop Time",
                    'mail@ninerogues.com',
                    [user.email],
                    fail_silently=False
                )

                # Vaciar carrito
                cart_items.delete()
                cart.total_items = 0
                cart.save()

                return Response({'success': 'Transacción exitosa y orden creada'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'La transacción falló'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'error': 'Error inesperado en el servidor'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
