from django.contrib import admin

# Register your models here.
from apps.product.models import Product

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'purchase_price',
                    'price', 'quantity', 'sold',)
    list_display_links = ('id', 'name', )
    list_filter = ('category', )
    list_editable = ('purchase_price', 'price', 'quantity', )
    search_fields = ('name', 'description', )
    list_per_page = 25

admin.site.register(Product, ProductAdmin)