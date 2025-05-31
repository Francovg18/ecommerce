from rest_framework import serializers
from .models import WishListItem
from apps.product.serializers import ProductSerializer

class WishListItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = WishListItem
        fields = ['id', 'product']
