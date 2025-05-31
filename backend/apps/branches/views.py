from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Sucursal, StockPorSucursal
from .serializers import SucursalSerializer, StockPorSucursalSerializer
from apps.product.models import Product


class SucursalListCreateView(APIView):
    def get(self, request):
        sucursales = Sucursal.objects.all()
        serializer = SucursalSerializer(sucursales, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SucursalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StockPorSucursalListCreateView(APIView):
    def get(self, request):
        stock = StockPorSucursal.objects.select_related(
            'producto', 'sucursal').all()
        serializer = StockPorSucursalSerializer(stock, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = StockPorSucursalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Actualiza el quantity total del producto
            producto = serializer.instance.producto
            total = sum(s.cantidad for s in producto.stock_por_sucursal.all())
            producto.quantity = total
            producto.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ActualizarStockView(APIView):
    def post(self, request):
        producto_id = request.data.get("producto_id")
        sucursal_id = request.data.get("sucursal_id")
        cantidad = int(request.data.get("cantidad", 0))

        try:
            stock = StockPorSucursal.objects.get(
                producto_id=producto_id, sucursal_id=sucursal_id)
            if stock.cantidad >= cantidad:
                stock.cantidad -= cantidad
                stock.save()

                producto = Product.objects.get(id=producto_id)
                producto.quantity -= cantidad
                producto.save()

                return Response({"message": "Stock actualizado correctamente"}, status=200)
            else:
                return Response({"error": "Stock insuficiente"}, status=400)
        except StockPorSucursal.DoesNotExist:
            return Response({"error": "No hay stock para ese producto en la sucursal"}, status=404)
