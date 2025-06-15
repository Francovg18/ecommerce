from django.db import models
from django.conf import settings

class EmotionAnalysis(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    respuestas = models.JSONField()  # Guarda las 15 respuestas tipo Likert
    resultado = models.CharField(max_length=50)
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.resultado}"
