from rest_framework import serializers
from .models import Product, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    #imágenes adicionales 
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'description']


class ProductSerializer(serializers.ModelSerializer):
    get_thumbnail = serializers.SerializerMethodField()
    get_pdf_url = serializers.SerializerMethodField()
    extra_images = ProductImageSerializer(many=True, read_only=True)
    user_price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'sku',
            'photo',
            'description',
            'short_description',
            'price',
            'user_price',
            'price_mayorista_1',
            'price_mayorista_2',
            'price_mayorista_3',
            'compare_price',
            'category',
            'brand',
            'quantity',
            'sold',
            'date_created',
            'video_url',
            'pdf',
            'get_thumbnail',
            'get_pdf_url',
            'extra_images'
        ]

    def get_thumbnail(self, obj):
        return obj.get_thumbnail()

    def get_pdf_url(self, obj):
        return obj.get_pdf_url()

    def get_user_price(self, obj):
        request = self.context.get('request', None)

        if not request or not hasattr(request, "user"):
            return obj.price

        if hasattr(request.user, "mayorista_tipo"):
            return obj.get_price_for_user(request.user)

        return obj.price
