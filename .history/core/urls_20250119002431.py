from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # URLs de autenticación proporcionadas por Djoser (autenticación, JWT, social)
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),

    path('api/category/', include('apps.category.urls')), 
    path('api/product/', include('apps.product.urls')), 
    path('api/cart/', include('apps.cart.urls')), 
    path('api/shipping/', include('apps.shipping.urls')), 
    path('api/orders/', include('apps.orders.urls')), 
    path('api/payment/', include('apps.payment.urls')), 
    path('api/coupons/', include('apps.coupons.urls')), 
    path('api/profile/', include('apps.user_profile.urls')), 
    path('api/wishlist/', include('apps.wishlist.urls')), 
    path('api/reviews/', include('apps.reviews.urls')), 
    path('api/brand/', include('apps.brand.urls')), 

    # Ruta del panel de administración de Django
    path('admin/', admin.site.urls),
]

# Añadir la ruta para servir archivos estáticos y de medios
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Rutas para el manejo de aplicaciones basadas en el frontend, como React
# Cualquier ruta no capturada será redirigida al index.html
urlpatterns += [
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]
