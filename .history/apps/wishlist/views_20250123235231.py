from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.cart.models import Cart, CartItem
from .models import WishList, WishListItem
from apps.product.models import Product
from apps.product.serializers import ProductSerializer

class GetItemsView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            wishlist = WishList.objects.get(user=user)
            wishlist_items = WishListItem.objects.filter(wishlist=wishlist)
            result = []

            if WishListItem.objects.filter(wishlist=wishlist).exists():
                for wishlist_item in wishlist_items:
                    item = {}
                    item['id'] = wishlist_item.id
                    product = Product.objects.get(id=wishlist_item.product.id)
                    product = ProductSerializer(product)
                    item['product'] = product.data
                    result.append(item)
            return Response(
                {'wishlist': result},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving wishlist items'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class AddItemView(APIView):
    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data

        try:
            product_id = int(data.get('product_id'))
            product = Product.objects.filter(id=product_id).first()
            if not product:
                return Response({'error': 'This product does not exist'}, status=status.HTTP_404_NOT_FOUND)

            wishlist, _ = WishList.objects.get_or_create(user=user)
            if WishListItem.objects.filter(wishlist=wishlist, product=product).exists():
                return Response({'error': 'Item already in wishlist'}, status=status.HTTP_409_CONFLICT)

            WishListItem.objects.create(product=product, wishlist=wishlist)
            wishlist_items = WishListItem.objects.filter(wishlist=wishlist)

            serialized_products = ProductSerializer([item.product for item in wishlist_items], many=True)
            return Response({'wishlist': serialized_products.data}, status=status.HTTP_201_CREATED)

        except ValueError:
            return Response({'error': 'Invalid product ID'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetItemTotalView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            wishlist = WishList.objects.get(user=user)
            total_items = wishlist.total_items

            return Response(
                {'total_items': total_items},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving total number of wishlist items'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class RemoveItemView(APIView):
    def delete(self, request, format=None):
        user = self.request.user
        data = self.request.data

        try:
            product_id = int(data['product_id'])
        except:
            return Response(
                {'error': 'Product ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            wishlist = WishList.objects.get(user=user)
            if not Product.objects.filter(id=product_id).exists():
                return Response(
                    {'error': 'Product with this ID does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )
            product = Product.objects.get(id=product_id)
            if not WishListItem.objects.filter(wishlist=wishlist, product=product).exists():
                return Response(
                    {'error': 'This product is not in your wishlist'},
                    status=status.HTTP_404_NOT_FOUND
                )
            WishListItem.objects.filter(
                wishlist=wishlist,
                product=product
            ).delete()

            if not WishListItem.objects.filter(wishlist=wishlist, product=product).exists():
                # Actualiizar el total de items en el wishlist
                total_items = int(wishlist.total_items) - 1
                WishList.objects.filter(user=user).update(
                    total_items=total_items
                )
            
            wishlist_items = WishListItem.objects.filter(wishlist=wishlist)

            result = []

            if WishListItem.objects.filter(wishlist=wishlist).exists():
                for wishlist_item in wishlist_items:
                    item = {}

                    item['id'] = wishlist_item.id
                    product = Product.objects.get(id=wishlist_item.product.id)
                    product = ProductSerializer(product)

                    item['product'] = product.data

                    result.append(item)

            return Response(
                {'wishlist': result},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when removing wishlist item'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )