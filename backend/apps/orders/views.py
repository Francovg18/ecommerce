from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from apps.product.models import Product


class ListOrdersView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        try:
            orders = Order.objects.order_by('-date_issued').filter(user=user)
            result = []

            for order in orders:
                item = {}
                item['status'] = order.status
                item['transaction_id'] = order.transaction_id

                # Calcular el total de la orden basado en los precios de mayorista
                total_amount = 0
                order_items = OrderItem.objects.filter(order=order)

                for order_item in order_items:
                    product = order_item.product
                    price = product.price

                    if user.mayorista_tipo == 1:
                        price = product.price_mayorista_1 or price
                    elif user.mayorista_tipo == 2:
                        price = product.price_mayorista_2 or price
                    elif user.mayorista_tipo == 3:
                        price = product.price_mayorista_3 or price

                    total_amount += price * order_item.count

                item['amount'] = total_amount
                item['shipping_price'] = order.shipping_price
                item['date_issued'] = order.date_issued
                item['address_line_1'] = order.address_line_1
                item['address_line_2'] = order.address_line_2

                result.append(item)

            return Response({'orders': result}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Something went wrong when retrieving orders: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ListOrderDetailView(APIView):
    def get(self, request, transactionId, format=None):
        user = self.request.user
        try:
            if Order.objects.filter(user=user, transaction_id=transactionId).exists():
                order = Order.objects.get(
                    user=user, transaction_id=transactionId)
                result = {}
                result['status'] = order.status
                result['transaction_id'] = order.transaction_id
                result['full_name'] = order.full_name
                result['address_line_1'] = order.address_line_1
                result['address_line_2'] = order.address_line_2
                result['city'] = order.city
                result['state_province_region'] = order.state_province_region
                result['age'] = order.age
                result['telephone_number'] = order.telephone_number
                result['shipping_name'] = order.shipping_name
                result['shipping_time'] = order.shipping_time
                result['shipping_price'] = order.shipping_price
                result['date_issued'] = order.date_issued

                order_items = OrderItem.objects.order_by(
                    '-date_added').filter(order=order)
                result['order_items'] = []
                total_amount = 0

                for order_item in order_items:
                    sub_item = {}
                    product = order_item.product
                    price = product.price

                    if user.mayorista_tipo == 1:
                        price = product.price_mayorista_1 or price
                    elif user.mayorista_tipo == 2:
                        price = product.price_mayorista_2 or price
                    elif user.mayorista_tipo == 3:
                        price = product.price_mayorista_3 or price

                    sub_item['name'] = order_item.name
                    sub_item['price'] = price
                    sub_item['count'] = order_item.count

                    result['order_items'].append(sub_item)
                    total_amount += price * order_item.count

                # Total ajustado según el tipo de usuario
                result['amount'] = total_amount

                return Response({'order': result}, status=status.HTTP_200_OK)
            else:
                return Response(
                    {'error': 'Order with this transaction ID does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )
        except Exception as e:
            return Response(
                {'error': f'Something went wrong when retrieving order detail: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
