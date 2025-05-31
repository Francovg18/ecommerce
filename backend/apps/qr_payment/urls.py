from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import GenerateQRView, VerifyPaymentView

urlpatterns = [
    path('generate-qr/', GenerateQRView.as_view(), name='generate-qr'),
    path('verify-payment/', VerifyPaymentView.as_view(), name='verify-payment'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
