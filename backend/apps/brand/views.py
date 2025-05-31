from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from .models import Brand


class ListBrandsView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        if Brand.objects.all().exists():
            brands = Brand.objects.all()

            result = []

            for brand in brands:
                item = {
                    'id': brand.id,
                    'name': brand.name,
                    'logo': brand.logo.url if brand.logo else None
                }
                result.append(item)
                
            return Response({'brands': result}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No existen las marcas'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
