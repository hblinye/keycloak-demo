from django.db import models
# Create your models here.


class User(models.Model):
    
    sub = models.CharField(
        max_length=100,
        unique=True,
        null=False,
        blank=False
    )

    family_name = models.CharField(
        null=True,
        max_length=100
    )

    given_name = models.CharField(
        null=True,
        max_length=100
    )


class Inventory(models.Model):

    name = models.CharField(max_length=100)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='user'
    )
