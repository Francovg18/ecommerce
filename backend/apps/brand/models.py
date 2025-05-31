from django.db import models

class Brand(models.Model):
    class Meta:
        verbose_name = 'Brand'
        verbose_name_plural = 'Brands'

    name = models.CharField(max_length=255, unique=True)
    logo = models.ImageField(upload_to='brand_logos/%Y/%m/', blank=True, null=True)

    def __str__(self):
        return self.name
