from django.contrib import admin
from import_export.admin import ImportExportModelAdmin 
from .models import Sucursal, StockPorSucursal
from .resources import SucursalResource, StockPorSucursalResource

@admin.register(Sucursal)
class SucursalAdmin(ImportExportModelAdmin, admin.ModelAdmin): 
    list_display = ['nombre']
    search_fields = ['nombre']
    resource_class = SucursalResource  

@admin.register(StockPorSucursal)
class StockPorSucursalAdmin(ImportExportModelAdmin, admin.ModelAdmin): 
    list_display = ['producto', 'sucursal', 'cantidad']
    list_filter = ['sucursal']
    search_fields = ['producto__name', 'sucursal__nombre']
    resource_class = StockPorSucursalResource  
