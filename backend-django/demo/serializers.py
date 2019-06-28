from rest_framework import serializers
from db.models import Inventory


class InventorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Inventory
        fields = ['name']