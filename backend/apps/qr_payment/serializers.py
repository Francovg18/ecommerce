from rest_framework import serializers
from .models import QRPayment


class QRPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = QRPayment
        fields = '__all__'
