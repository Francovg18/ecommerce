from django.db import models
from django.utils import timezone


class User_register(models.Model):
    nombre = models.CharField(max_length=200)
    apellido = models.CharField(max_length=200)
    ci = models.CharField(max_length=20, unique=True)
    foto_anverso_ci = models.ImageField(upload_to='preregistro/ci_anverso/')
    foto_reverso_ci = models.ImageField(upload_to='preregistro/ci_reverso/')
    numero_celular = models.CharField(max_length=20)
    correo = models.EmailField(unique=True)
    ciudad = models.CharField(max_length=100)
    direccion = models.TextField()
    actividad_economica = models.TextField()
    fecha_registro = models.DateTimeField(default=timezone.now, blank=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido} - {self.ci}"
