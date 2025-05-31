from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import WishList, WishListItem
from apps.product.models import Product
from .serializers import WishListItemSerializer


class GetItemsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            wishlist, _ = WishList.objects.get_or_create(user=user)
            items = wishlist.items.all()
            serializer = WishListItemSerializer(items, many=True)
            return Response({'wishlist': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddItemView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        product_id = request.data.get('product_id')

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        wishlist, _ = WishList.objects.get_or_create(user=user)

        if WishListItem.objects.filter(wishlist=wishlist, product=product).exists():
            return Response({'error': 'Product already in wishlist'}, status=status.HTTP_409_CONFLICT)

        WishListItem.objects.create(wishlist=wishlist, product=product)
        items = wishlist.items.all()
        serializer = WishListItemSerializer(items, many=True)
        return Response({'wishlist': serializer.data}, status=status.HTTP_201_CREATED)


class RemoveItemView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        product_id = request.data.get('product_id')

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            wishlist = WishList.objects.get(user=user)
        except WishList.DoesNotExist:
            return Response({'error': 'Wishlist not found'}, status=status.HTTP_404_NOT_FOUND)

        item = WishListItem.objects.filter(wishlist=wishlist, product=product).first()
        if not item:
            return Response({'error': 'Item not in wishlist'}, status=status.HTTP_404_NOT_FOUND)

        item.delete()
        items = wishlist.items.all()
        serializer = WishListItemSerializer(items, many=True)
        return Response({'wishlist': serializer.data}, status=status.HTTP_200_OK)


class GetItemTotalView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            wishlist, _ = WishList.objects.get_or_create(user=user)
            total_items = wishlist.items.count()
            return Response({'total_items': total_items}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
