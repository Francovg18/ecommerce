from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    get_thumbnail = serializers.SerializerMethodField()
    get_pdf_url = serializers.SerializerMethodField()

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
            'compare_price',
            'category',
            'brand',
            'quantity',
            'sold',
            'date_created',
            'video_url',
            'pdf',
            'get_thumbnail',
            'get_pdf_url'
        ]

    def get_thumbnail(self, obj):
        return obj.get_thumbnail()

    def get_pdf_url(self, obj):
        return obj.get_pdf_url()
