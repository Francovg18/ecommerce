from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class SentimentAnalysis(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    # Comentario original del usuario
    comment = models.TextField()

    # Comentario preprocesado (limpio, sin emojis ni signos)
    cleaned_comment = models.TextField(blank=True, null=True)

    # Sentimiento predicho (Positivo, Neutro, Negativo, Agresivo)
    sentiment = models.CharField(max_length=20)

    # Probabilidad del modelo de que sea "Agresivo"
    probability_agresivo = models.FloatField(null=True, blank=True)

    # Atributos usados internamente por el modelo (simulados o inferidos)
    producto = models.CharField(max_length=100, blank=True, null=True)
    sucursal = models.CharField(max_length=100, blank=True, null=True)
    tipo_mayorista = models.CharField(max_length=50, blank=True, null=True)

    categoria = models.IntegerField(blank=True, null=True)
    precio_producto = models.FloatField(blank=True, null=True)

    # Flag si contiene palabras agresivas
    flag_agresivo = models.BooleanField(default=False)

    # Fecha de análisis
    analyzed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.sentiment}] {self.comment[:40]}"
