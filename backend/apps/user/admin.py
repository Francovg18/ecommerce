from django.contrib import admin
from django.contrib.auth import get_user_model

User = get_user_model()

class UserAdmin(admin.ModelAdmin):
    list_display = (
        'first_name', 'last_name', 'email', 'mayorista_tipo',
        'faltas_agresivas',  # ✅ Muestra en la lista
        'is_staff', 'is_superuser', 'is_active', 'last_login'
    )
    list_display_links = ('first_name', 'last_name', 'email')
    search_fields = ('first_name', 'last_name', 'email')
    list_filter = ('mayorista_tipo', 'is_staff', 'is_superuser', 'is_active')
    list_per_page = 25

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Información Personal', {'fields': ('first_name', 'last_name')}),
        ('Rol de Mayorista', {'fields': ('mayorista_tipo',)}),
        ('Faltas y Control', {'fields': ('faltas_agresivas',)}),  # ✅ Nueva sección
        ('Permisos', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Fechas Importantes', {'fields': ('last_login',)}),
    )

admin.site.register(User, UserAdmin)
