from rest_framework import serializers
from .models import User_register

class User_registerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_register
        fields = '__all__'