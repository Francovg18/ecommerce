from django.urls import path
from .views import (
    SucursalListCreateView,
    StockPorSucursalListCreateView,
    ActualizarStockView,
)

urlpatterns = [
    path('sucursales', SucursalListCreateView.as_view()),
    path('stock', StockPorSucursalListCreateView.as_view()),
    path('stock/update', ActualizarStockView.as_view()),
]
