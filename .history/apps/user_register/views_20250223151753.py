from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import User_register
import requests

activecampaign_url = settings.ACTIVE_CAMPAIGN_URL
activecampaign_key = settings.ACTIVE_CAMPAIGN_KEY


class User_registerCreateView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        data = request.data

        nombre = data.get('nombre')
        apellido = data.get('apellido')
        ci = data.get('ci')
        foto_anverso_ci = data.get('foto_anverso_ci')
        foto_reverso_ci = data.get('foto_reverso_ci')
        numero_celular = data.get('numero_celular')
        correo = data.get('correo')
        ciudad = data.get('ciudad')
        direccion = data.get('direccion')
        actividad_economica = data.get('actividad_economica')

        if not all([nombre, apellido, ci, foto_anverso_ci, foto_reverso_ci, numero_celular, correo, ciudad, direccion, actividad_economica]):
            return Response({'error': 'Todos los campos son obligatorios'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Guardar en la base de datos
            preregistro = User_register.objects.create(
                nombre=nombre,
                apellido=apellido,
                ci=ci,
                foto_anverso_ci=foto_anverso_ci,
                foto_reverso_ci=foto_reverso_ci,
                numero_celular=numero_celular,
                correo=correo,
                ciudad=ciudad,
                direccion=direccion,
                actividad_economica=actividad_economica
            )

            # Enviar correo de confirmación
            send_mail(
                'Confirmación de Pre-Registro',
                f'Hola {nombre},\n\nTu pre-registro ha sido recibido con éxito. Nos pondremos en contacto contigo pronto.\n\nSaludos,\nEquipo de Administración',
                'alefrvg@gmail.com',
                [correo],
                fail_silently=False
            )

            # Integración con ActiveCampaign
            url = f"{activecampaign_url}/api/2/contact/sync"
            payload = {
                "contact": {
                    "email": correo,
                    "firstName": nombre,
                    "lastName": apellido,
                    "phone": numero_celular
                }
            }
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Api-Token': activecampaign_key
            }

            response = requests.post(url, json=payload, headers=headers)

            if response.status_code not in [200, 201]:
                return Response({'error': 'Error al registrar el contacto en ActiveCampaign'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'success': 'Pre-registro enviado correctamente'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': f'Error en el servidor: {str(e)}'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
