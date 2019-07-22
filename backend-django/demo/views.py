from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import InventorySerializer
from db.models import Inventory
import django_filters.rest_framework


class InventoryViewSet(viewsets.ModelViewSet):
    # keycloak_scopes = {
    #     'GET': 'inventory:view',
    #     'POST': 'inventory:add',
    #     'PUT': 'inventory:update',
    #     'DELETE': 'inventory:delete'
    # }
    serializer_class = InventorySerializer
    queryset = Inventory.objects.all().order_by('id')
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend, )

    def get_queryset(self):
        all_inventories = Inventory.objects.filter(user=self.request._current_user)
        return all_inventories

    def perform_create(self, serializer):
        return self.save_instance(Inventory(), serializer.validated_data)

    def perform_update(self, serializer):
        return self.save_instance(serializer.instance, serializer.validated_data)

    def save_instance(self, instance, validated_data):
        instance.name = validated_data.get('name')
        instance.user = self.request._current_user
        instance.save()
        return instance
