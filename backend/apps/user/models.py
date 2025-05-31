from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.cart.models import Cart
from apps.user_profile.models import UserProfile
from apps.wishlist.models import WishList


class UserAccountManager(BaseUserManager):
    #creación de usuarios y superusuarios
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('El usuario debe tener un correo electrónico'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        if password:
            user.set_password(password)
        else:
            raise ValueError(_('La contraseña es obligatoria'))

        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        #Crea y devuelve un superusuario
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        return self.create_user(email, password, **extra_fields)


class UserAccount(AbstractBaseUser, PermissionsMixin):

    MAYORISTA_CHOICES = [
        (0, _('Cliente Normal')),
        (1, _('Mayorista 1')),
        (2, _('Mayorista 2')),
        (3, _('Mayorista 3')),
    ]

    email = models.EmailField(_('Correo electrónico'),
                              max_length=255, unique=True, db_index=True)
    first_name = models.CharField(_('Nombre'), max_length=255)
    last_name = models.CharField(_('Apellido'), max_length=255)
    is_active = models.BooleanField(_('Activo'), default=True)
    is_staff = models.BooleanField(_('Es staff'), default=False)
    faltas_agresivas = models.PositiveIntegerField(default=0)
    mayorista_tipo = models.IntegerField(
        _('Tipo de Mayorista'), choices=MAYORISTA_CHOICES, default=0)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email


@receiver(post_save, sender=UserAccount)
def create_user_related_objects(sender, instance, created, **kwargs):
    #Crea objetos relacionados después de registrar un usuario
    if created:
        Cart.objects.create(user=instance)
        UserProfile.objects.create(user=instance)
        WishList.objects.create(user=instance)
