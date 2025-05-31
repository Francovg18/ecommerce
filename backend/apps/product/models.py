from django.db import models
from datetime import datetime
from apps.category.models import Category
from apps.brand.models import Brand
from django.conf import settings

domain = settings.DOMAIN


class Product(models.Model):
    name = models.CharField(max_length=255)
    sku = models.CharField(max_length=100, unique=True, default='')
    photo = models.ImageField(upload_to='photos/%Y/%m/', null=True, blank=True)
    description = models.TextField()
    short_description = models.TextField()
    price = models.DecimalField(max_digits=7, decimal_places=2, default=0.00)
    price_mayorista_1 = models.DecimalField(
        max_digits=7, decimal_places=2, default=0.00)
    price_mayorista_2 = models.DecimalField(
        max_digits=7, decimal_places=2, default=0.00)
    price_mayorista_3 = models.DecimalField(
        max_digits=7, decimal_places=2, default=0.00)

    compare_price = models.DecimalField(max_digits=7, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    sold = models.IntegerField(default=0)
    date_created = models.DateTimeField(default=datetime.now)
    video_url = models.URLField(blank=True, null=True)
    pdf = models.FileField(upload_to='pdfs/%Y/%m/', blank=True, null=True)

    def get_price_for_user(self, user):
        if user.mayorista_tipo == 1:
            return self.price_mayorista_1
        elif user.mayorista_tipo == 2:
            return self.price_mayorista_2
        elif user.mayorista_tipo == 3:
            return self.price_mayorista_3
        return self.price

    def get_thumbnail(self):
        if self.photo:
            return self.photo.url
        return ''

    def get_pdf_url(self):
        if self.pdf:
            return self.pdf.url
        return ''

    def get_extra_photos(self):
        return [photo.image.url for photo in self.extra_images.all()]

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, related_name='extra_images', on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to='product_images/%Y/%m/', null=True, blank=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    uploaded_at = models.DateTimeField(
        null=True)

    def __str__(self):
        return f"Extra Image for {self.product.name}"
