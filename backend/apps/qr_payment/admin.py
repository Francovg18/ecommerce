from django.contrib import admin
from .models import QRPayment


class QRPaymentAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'reference', 'status')
    readonly_fields = ('qr_code_url', 'qr_code')


admin.site.register(QRPayment, QRPaymentAdmin)
