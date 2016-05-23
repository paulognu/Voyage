from regional.serializers import UnidadesSerializer, DivisoesSerializer,\
    ColaboradoresSerializer, EquipesSerializer, ColaboradoresListSerializer,\
    InstalacoesSerializer, EquipamentosSerializer, InstalacaoTiposSerializer,\
    EquipamentoTiposSerializer
from regional.models import Unidades, Divisoes, Colaboradores, Equipes,\
    Instalacoes, Equipamentos, InstalacaoTipos, EquipamentoTipos
from rest_framework_mongoengine import viewsets
from rest_framework import filters, authentication, permissions

from mongoengine.queryset.visitor import Q
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth import authenticate

class LargeResultsSetPagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = 'page_size'
    max_page_size = 1000
        

class UnidadesViewSet(viewsets.ModelViewSet):
    queryset = Unidades.objects.all().order_by('sigla')
    serializer_class = UnidadesSerializer
    pagination_class = LargeResultsSetPagination
    
    def get_queryset(self):        
        queryset = Unidades.objects
        filtro = self.request.query_params.get('filtro', None)
        
        if filtro:
            queryset = queryset(Q(nome__contains=filtro) | Q(sigla__contains=filtro))
        
        return queryset.all()

class DivisoesViewSet(viewsets.ModelViewSet):
    queryset = Divisoes.objects.all().order_by('sigla')
    serializer_class = DivisoesSerializer 
    pagination_class = LargeResultsSetPagination

    def get_queryset(self):        
        queryset = Divisoes.objects
        filtro = self.request.query_params.get('filtro', None)
        
        if filtro:
            queryset = queryset(Q(nome__contains=filtro) | Q(sigla__contains=filtro))
        
        return queryset.all()


class ColaboradoresViewSet(viewsets.ModelViewSet):
    queryset = Colaboradores.objects.all().order_by('nome_completo')
    serializer_class = ColaboradoresSerializer 
    pagination_class = LargeResultsSetPagination
    
    def get_queryset(self):        
        queryset = Colaboradores.objects
        filtro = self.request.query_params.get('filtro', None)
        
        if filtro:
            queryset = queryset(Q(nome_completo__contains=filtro) | Q(matricula__contains=filtro) | Q(email__contains=filtro))
        
        return queryset.all()
    
    
class ColaboradoresListViewSet(viewsets.ModelViewSet):
    queryset = Colaboradores.objects.all().order_by('nome_completo')
    serializer_class = ColaboradoresListSerializer
    pagination_class = None
    
    def get_queryset(self):        
        queryset = Colaboradores.objects
        filtro = self.request.query_params.get('filtro', None)
        
        if filtro:
            queryset = queryset(Q(nome_completo__contains=filtro) | Q(matricula__contains=filtro) | Q(email__contains=filtro))
        
        return queryset.all()    


class EquipesViewSet(viewsets.ModelViewSet):
    queryset = Equipes.objects.all().order_by('nome')
    serializer_class = EquipesSerializer 
    pagination_class = LargeResultsSetPagination
    
    #user = authenticate(username='10276', password='123456')
    #print(user)
    
    def get_queryset(self):        
        queryset = Equipes.objects
        filtro = self.request.query_params.get('filtro', None)
        
        if filtro:
            queryset = queryset(Q(nome__contains=filtro) | Q(sigla__contains=filtro) | Q(descricao__contains=filtro) | Q(observacao__contains=filtro))
        
        return queryset.all()
    

class InstalacaoTiposViewSet(viewsets.ModelViewSet):
    queryset = InstalacaoTipos.objects.all().order_by('nome')
    serializer_class = InstalacaoTiposSerializer
    pagination_class = None
    
    def get_queryset(self):        
        queryset = InstalacaoTipos.objects
        filtro = self.request.query_params.get('filtro', None)
        
        if filtro:
            queryset = queryset(Q(nome__contains=filtro))
        
        return queryset.all()
    
    
class InstalacoesViewSet(viewsets.ModelViewSet):
    queryset = Instalacoes.objects.all().order_by('nome')
    serializer_class = InstalacoesSerializer
    pagination_class = LargeResultsSetPagination
    
    def get_queryset(self):        
        queryset = Instalacoes.objects
        filtro = self.request.query_params.get('filtro', None)
        
        if filtro:
            queryset = queryset(Q(nome__contains=filtro) | Q(sigla__contains=filtro) | Q(tipo__contains=filtro))
        
        return queryset.all()
    

class EquipamentoTiposViewSet(viewsets.ModelViewSet):
    queryset = EquipamentoTipos.objects.all().order_by('nome')
    serializer_class = EquipamentoTiposSerializer
    pagination_class = None
    
    def get_queryset(self):        
        queryset = EquipamentoTipos.objects
        filtro = self.request.query_params.get('filtro', None)
        
        if filtro:
            queryset = queryset(Q(nome__contains=filtro))
        
        return queryset.all()        

class EquipamentosViewSet(viewsets.ModelViewSet):
    queryset = Equipamentos.objects.all().order_by('nome')
    serializer_class = EquipamentosSerializer
    pagination_class = LargeResultsSetPagination
    
    def get_queryset(self):        
        queryset = Equipamentos.objects
        instalacao = self.request.query_params.get('instalacao', None)
        filtro = self.request.query_params.get('filtro', None)
        
        if filtro:
            queryset = queryset(Q(codigo_operacional__contains=filtro))
        
        print(instalacao)
        
        if instalacao:
            return queryset.filter(instalacao=instalacao).all()
        else:
            return queryset.all()