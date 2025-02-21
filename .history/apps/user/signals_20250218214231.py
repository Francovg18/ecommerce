from django.db.models.signals import post_save
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.dispatch import receiver

User = get_user_model()

@receiver(post_save, sender=User)
def assign_user_group(sender, instance, created, **kwargs):
    if created:  # Solo asigna grupo al crear usuario
        if instance.email == "alefrvg@gmail.com":
            admin_group, _ = Group.objects.get_or_create(name="Admin")
            instance.is_superuser = True
            instance.is_staff = True
            instance.groups.add(admin_group)
        elif instance.email.endswith("@vendedor.com"):  
            seller_group, _ = Group.objects.get_or_create(name="Vendedor")
            instance.is_staff = True
            instance.groups.add(seller_group)
        else:  # Clientes
            client_group, _ = Group.objects.get_or_create(name="Cliente")
            instance.groups.add(client_group)

        # Guarda el usuario después de asignar permisos
        instance.save(update_fields=["is_superuser", "is_staff"])  
