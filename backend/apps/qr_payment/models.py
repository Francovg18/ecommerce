from django.db import models
from django.conf import settings


class QRPayment(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('paid', 'Pagado'),
        ('failed', 'Fallido'),
    ]

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    reference = models.CharField(max_length=255, default="DEFAULT_VALUE")
    qr_code = models.ImageField(upload_to='qr_codes/', blank=True, null=True)
    qr_code_url = models.URLField(blank=True, null=True)
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def mark_as_paid(self):
        #Marcar el pago como pagado
        self.status = 'paid'
        self.save()

    def mark_as_failed(self):
        #Marcar el pago como fallido
        self.status = 'failed'
        self.save()

    def __str__(self):
        return f"{self.reference} - {self.status}"
