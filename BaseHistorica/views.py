from rest_framework import viewsets, permissions
from BaseHistorica.serializers import pas_rSerializer, pds_rSerializer
from BaseHistorica.models import pas_r, pds_r

from django.db.models import Q

class pas_rViewSet(viewsets.ModelViewSet):
    queryset = pas_r.objects.order_by('nome')
    serializer_class = pas_rSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
    )     
    
    def get_queryset(self):
        queryset = pas_r.objects
        filtro = self.request.query_params.get('filtro', None)
        
        if filtro:            
            queryset = queryset.filter(Q(id__contains=filtro))
        
        return queryset.order_by('nome')
    
    
class pds_rViewSet(viewsets.ModelViewSet):
    queryset = pds_r.objects.order_by('nome')
    serializer_class = pds_rSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
    )     
    
    def get_queryset(self):
        queryset = pds_r.objects
        filtro = self.request.query_params.get('filtro', None)
        
        if filtro:            
            queryset = queryset.filter(Q(id__contains=filtro))
        
        return queryset.order_by('nome')    