from django.urls import path
from .views import *

urlpatterns = [
    path('get-reviews/<productId>', GetProductReviewsView.as_view()),
    path('get-review/<productId>', GetProductReviewView.as_view()),
    path('create-review/<int:productId>', CreateProductReviewView.as_view()),
    path('update-review/<int:productId>', UpdateProductReviewView.as_view()),

    path('delete-review/<productId>', DeleteProductReviewView.as_view()),
    path('filter-reviews/<productId>', FilterProductReviewsView.as_view()),
]
