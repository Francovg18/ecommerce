from rest_framework import serializers
from .models import Sucursal, StockPorSucursal


class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = ['id', 'nombre']


class StockPorSucursalSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(
        source='producto.name', read_only=True)
    sucursal_nombre = serializers.CharField(
        source='sucursal.nombre', read_only=True)

    class Meta:
        model = StockPorSucursal
        fields = ['id', 'producto', 'producto_nombre',
                  'sucursal', 'sucursal_nombre', 'cantidad']
