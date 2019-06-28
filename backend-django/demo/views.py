from rest_framework import viewsets
from .serializers import InventorySerializer
from db.models import Inventory
import django_filters.rest_framework


class InventoryViewSet(viewsets.ModelViewSet):
    keycloak_scopes = {
        'GET': 'inventory:view',
        'POST': 'inventory:add',
        'PUT': 'inventory:update',
        'DELETE': 'inventory:delete'
    }    
    serializer_class = InventorySerializer
    queryset = Inventory.objects.all().order_by('id')
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend, )
