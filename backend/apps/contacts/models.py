from django.db import models
from django.utils import timezone
from django.conf import settings


class Contact(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    message = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True,
                            null=True)
    contact_date = models.DateTimeField(default=timezone.now, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.email
