from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from .models import Contact
import requests

activecampaign_url = settings.ACTIVE_CAMPAIGN_URL
activecampaign_key = settings.ACTIVE_CAMPAIGN_KEY

class ContactCreateView(APIView):
    permission_classes = [permissions.AllowAny]  # Permitir acceso sin autenticación

    def post(self, request, format=None):
        data = request.data

        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject')
        message = data.get('message')
        phone = data.get('phone')
        budget = data.get('budget')

        if not all([name, email, subject, message, phone, budget]):
            return Response({'error': 'Todos los campos son obligatorios'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Enviar correo
            send_mail(
                subject,
                f"Name: {name}\nEmail: {email}\nPhone: {phone}\nMessage:\n{message}\nBudget: {budget}",
                'alefrvg@gmail.com',
                ['alefrvg@gmail.com'],
                fail_silently=False
            )

            # Guardar en la base de datos
            Contact.objects.create(
                name=name, email=email, subject=subject, phone=phone, message=message, budget=budget
            )

            # Crear o actualizar el contacto en ActiveCampaign
            url = f"{activecampaign_url}/api/3/contact/sync"
            payload = {
                "contact": {
                    "email": email,
                    "firstName": name,
                    "phone": phone
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

            contact_data = response.json()
            contact_id = str(contact_data.get('contact', {}).get('id'))

            if not contact_id:
                return Response({'error': 'No se pudo obtener el ID del contacto'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Agregar TAG al contacto
            tag_url = f"{activecampaign_url}/api/3/contactTags"
            tag_payload = {'contactTag': {'contact': contact_id, 'tag': '2'}}
            tag_response = requests.post(tag_url, json=tag_payload, headers=headers)

            if tag_response.status_code not in [200, 201]:
                return Response({'error': 'Error al agregar tag al contacto'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Agregar a lista maestra
            list_url = f"{activecampaign_url}/api/3/contactLists"
            list_payload = {'contactList': {'list': '2', 'contact': contact_id, 'status': '1'}}
            list_response = requests.post(list_url, json=list_payload, headers=headers)

            if list_response.status_code not in [200, 201]:
                return Response({'error': 'Error al agregar contacto a la lista'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'success': 'Mensaje enviado correctamente'}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': f'Error en el servidor: {str(e)}'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EbookSubscriptionView(APIView):
    permission_classes = [permissions.AllowAny]  # Permitir acceso sin autenticación

    def post(self, request, format=None):
        data = request.data
        email = data.get('email')

        if not email:
            return Response({'error': 'El correo electrónico es obligatorio'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Crear o actualizar contacto en ActiveCampaign
            url = f"{activecampaign_url}/api/3/contact/sync"
            payload = {'contact': {'email': email}}
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Api-Token': activecampaign_key
            }

            response = requests.post(url, json=payload, headers=headers)
            if response.status_code not in [200, 201]:
                return Response({'error': 'Error al registrar el contacto en ActiveCampaign'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            contact_data = response.json()
            contact_id = str(contact_data.get('contact', {}).get('id'))

            if not contact_id:
                return Response({'error': 'No se pudo obtener el ID del contacto'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Agregar TAG al contacto
            tag_url = f"{activecampaign_url}/api/3/contactTags"
            tag_payload = {'contactTag': {'contact': contact_id, 'tag': '3'}}
            tag_response = requests.post(tag_url, json=tag_payload, headers=headers)

            if tag_response.status_code not in [200, 201]:
                return Response({'error': 'Error al agregar tag al contacto'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Agregar a la lista de eBook
            list_url = f"{activecampaign_url}/api/3/contactLists"
            list_payload = {'contactList': {'list': '4', 'contact': contact_id, 'status': '1'}}
            list_response = requests.post(list_url, json=list_payload, headers=headers)

            if list_response.status_code not in [200, 201]:
                return Response({'error': 'Error al agregar contacto a la lista'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'success': 'Contacto agregado a la lista del eBook'}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': f'Error en el servidor: {str(e)}'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
