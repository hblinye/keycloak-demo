from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
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

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user_id == self.request._current_user.id:
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        else:
            return Response({"detail": "no permission"}, status=status.HTTP_403_FORBIDDEN)

    def perform_destroy(self, instance):
        if instance.user_id == self.request._current_user.id:
            instance.delete()
        else:
            raise ValidationError('no permission')
