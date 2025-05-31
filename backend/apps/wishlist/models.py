from django.db import models
from django.conf import settings
from apps.product.models import Product

User = settings.AUTH_USER_MODEL

class WishList(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user}'s wishlist"

class WishListItem(models.Model):
    wishlist = models.ForeignKey(WishList, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.product} in {self.wishlist.user}'s wishlist"
