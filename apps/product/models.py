from django.db import models
from datetime import datetime
from apps.category.models import Category
from apps.brand.models import Brand
from django.conf import settings

domain = settings.DOMAIN

class Product(models.Model):
    name = models.CharField(max_length=255)
    sku = models.CharField(max_length=100, unique=True, default='')  
    photo = models.ImageField(upload_to='photos/%Y/%m/')
    description = models.TextField()
    short_description = models.CharField(max_length=255, blank=True)  # Nueva descripción corta
    price = models.DecimalField(max_digits=6, decimal_places=2)
    compare_price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE) 
    quantity = models.IntegerField(default=0)
    sold = models.IntegerField(default=0)
    date_created = models.DateTimeField(default=datetime.now)
    video_url = models.URLField(blank=True, null=True)  # Nuevo campo para el video de YouTube
    pdf = models.FileField(upload_to='pdfs/%Y/%m/', blank=True, null=True)  # Nuevo campo para PDF

    def get_thumbnail(self):
        if self.photo:
            return self.photo.url
        return ''

    def get_pdf_url(self):
        if self.pdf:
            return self.pdf.url
        return ''

    def __str__(self):
        return self.name
