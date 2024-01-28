from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    email = models.EmailField(unique=True)


class Contact(models.Model):
    
    DIVISION_CHOICES = (
        ('barisal', 'Barisal'),
        ('chittagong', 'Chittagong'),
        ('dhaka', 'Dhaka'),
        ('khulna', 'Khulna'),
        ('mymensingh', 'Mymensingh'),
        ('rajshahi', 'Rajshahi'),
        ('rangpur', 'Rangpur'),
        ('sylhet', 'Sylhet'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    number = models.CharField(max_length=20)
    image = models.ImageField(upload_to='contact_img/', blank=True, null=True)
    division = models.CharField(max_length=255, choices=DIVISION_CHOICES)

    def __str__(self):
        return self.name