from django.db import models
from datetime import datetime
from apps.category.models import Category

from django.conf import settings
domain = settings.DOMAIN

class Product(models.Model):
    name = models.CharField(max_length=255)
    brand = models.CharField(max_length=255, default='')  # Added Brand
    sku = models.CharField(max_length=100, unique=True, default='')  # Added SKU
    photo = models.ImageField(upload_to='photos/%Y/%m/')
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    compare_price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    sold = models.IntegerField(default=0)
    date_created = models.DateTimeField(default=datetime.now)

    def get_thumbnail(self):
        if self.photo:
            return self.photo.url
        return ''

    def __str__(self):
        return self.name
