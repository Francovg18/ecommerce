from django.db import models
from apps.product.models import Product


class Sucursal(models.Model):
    nombre = models.CharField(max_length=255, unique=True)

    class Meta:
        db_table = 'sucursal'
        verbose_name = 'Sucursal'
        verbose_name_plural = 'Sucursales'

    def __str__(self):
        return self.nombre


class StockPorSucursal(models.Model):
    producto = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='stock_por_sucursal')
    sucursal = models.ForeignKey(
        Sucursal, on_delete=models.CASCADE, related_name='stock_por_producto')
    cantidad = models.IntegerField(default=0)

    class Meta:
        db_table = 'stock_por_sucursal'
        unique_together = (('producto', 'sucursal'),)
        verbose_name = 'Stock por sucursal'
        verbose_name_plural = 'Stock por sucursal'

    def __str__(self):
        return f"{self.producto.name} - {self.sucursal.nombre}: {self.cantidad}"
