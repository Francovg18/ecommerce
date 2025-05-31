from django.urls import path

from .views import ListBrandsView

urlpatterns = [
    path('brands', ListBrandsView.as_view()),
]