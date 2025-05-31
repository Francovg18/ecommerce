from import_export import resources
from .models import Sucursal, StockPorSucursal

class SucursalResource(resources.ModelResource):
    class Meta:
        model = Sucursal
        fields = ('id', 'nombre')  

class StockPorSucursalResource(resources.ModelResource):
    class Meta:
        model = StockPorSucursal
        fields = ('id', 'producto', 'sucursal', 'cantidad')  
        import_id_fields = ('producto', 'sucursal')  
