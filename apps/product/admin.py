from django.contrib import admin
from django.utils.html import format_html
from apps.product.models import Product

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'compare_price', 'price', 'quantity', 'sold', 'video_url', 'download_pdf')
    list_display_links = ('id', 'name', )
    list_filter = ('category', 'brand', )
    list_editable = ('compare_price', 'price', 'quantity', )
    search_fields = ('name', 'description', 'short_description', )
    list_per_page = 25

    fieldsets = (
        ('Información General', {
            'fields': ('name', 'sku', 'category', 'brand', 'description', 'short_description')
        }),
        ('Multimedia', {
            'fields': ('photo', 'video_url', 'pdf')
        }),
        ('Inventario y Precio', {
            'fields': ('price', 'compare_price', 'quantity', 'sold')
        }),
        ('Fecha', {
            'fields': ('date_created',)
        }),
    )

    def download_pdf(self, obj):
        """Muestra un enlace para descargar el PDF si existe"""
        if obj.pdf:
            return format_html('<a href="{}" target="_blank">Descargar PDF</a>', obj.pdf.url)
        return "No disponible"
    
    download_pdf.short_description = "Archivo PDF"

admin.site.register(Product, ProductAdmin)
