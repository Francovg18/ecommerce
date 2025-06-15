from django.urls import path, include, re_path
from django.views.static import serve
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
import os


def serve_react_frontend(request, path=''):
    return serve(request, path or "index.html", document_root=os.path.join(settings.BASE_DIR, '..', 'frontend', 'build'))


urlpatterns = [
    # URLs de autenticación con Djoser
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),

    # API de las aplicaciones del backend
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
    path('api/contacts/', include('apps.contacts.urls')),
    path('api/user_register/', include('apps.user_register.urls')),
    path('api/qr_payment/', include('apps.qr_payment.urls')),
    path('api/branches/', include('apps.branches.urls')),
    path('api/ml/', include('apps.ml.urls')),
    path('api/emotionstate/', include('apps.emotion_state.urls')),

    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

urlpatterns += [
    re_path(r'^(?:.*)/?$', serve_react_frontend),
]
