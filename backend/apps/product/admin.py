from django.contrib import admin
from django.utils.html import format_html
from apps.product.models import Product, ProductImage
from import_export.admin import ImportExportModelAdmin
from .resources import ProductResource


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ('image', 'description',)
    readonly_fields = ('preview_image',)

    def preview_image(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="100" />', obj.image.url)
        return "Sin imagen"

    preview_image.short_description = "Vista previa"


class ProductAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = ProductResource
    list_display = (
        'id', 'name', 'compare_price', 'price',
        'price_mayorista_1', 'price_mayorista_2', 'price_mayorista_3', 
        'quantity', 'sold', 'video_url', 'download_pdf'
    )
    list_display_links = ('id', 'name', )
    list_filter = ('category', 'brand', )
    list_editable = (
        'compare_price', 'price', 'price_mayorista_1', 'price_mayorista_2', 'price_mayorista_3',  
        'quantity',
    )

    fieldsets = (
        ('Información General', {
            'fields': ('name', 'sku', 'category', 'brand', 'description', 'short_description')
        }),
        ('Multimedia', {
            'fields': ('photo', 'video_url', 'pdf')
        }),
        ('Inventario y Precio', {
            'fields': ('price', 'price_mayorista_1', 'price_mayorista_2', 'price_mayorista_3', 'compare_price', 'quantity', 'sold')
        }),
        ('Fecha', {
            'fields': ('date_created',)
        }),
    )

    inlines = [ProductImageInline]

    def download_pdf(self, obj):
        if obj.pdf:
            return format_html('<a href="{}" target="_blank">Descargar PDF</a>', obj.pdf.url)
        return "No disponible"

    download_pdf.short_description = "Archivo PDF"


admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage)
