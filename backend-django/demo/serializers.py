from rest_framework import serializers
from rest_framework import fields
from db.models import Inventory
import uuid


class InventorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Inventory
        fields = ['id', 'name', 'user', 'accessKey']

    def create(self, validated_data):
        print(validated_data)
        inventory = Inventory(
            name=validated_data['name'],
            user=validated_data['user'],
            accessKey=str(uuid.uuid4())
        )
        inventory.save()
        return inventory
