from django.contrib import admin
from .models import Brand

class BrandAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')
    search_fields = ('name',)  # Corregido
    list_per_page = 25

admin.site.register(Brand, BrandAdmin)
