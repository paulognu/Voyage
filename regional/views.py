from regional.serializers import UnidadesSerializer, DivisoesSerializer,\
    ColaboradoresSerializer, EquipesSerializer, ColaboradoresListSerializer,\
    InstalacoesSerializer, EquipamentosSerializer, InstalacaoTiposSerializer,\
    EquipamentoTiposSerializer, AlimentadoresSerializer
from regional.models import Unidades, Divisoes, Colaboradores, Equipes,\
    Instalacoes, Equipamentos, InstalacaoTipos, EquipamentoTipos, Alimentadores
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
        divisao = self.request.query_params.get('divisao', None)
        
        if filtro:
            divisoes = Divisoes.objects.filter(Q(nome__contains=filtro) | Q(sigla__contains=filtro))
            queryset = queryset(Q(nome_completo__contains=filtro) | Q(matricula__contains=filtro) | Q(email__contains=filtro) | Q(divisao__in=divisoes))
        
        if divisao:
            print(divisao)
            queryset = queryset.filter(divisao=divisao)
            
        return queryset.order_by('nome_completo')
    
    
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
        
        return queryset.order_by('nome')
    

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
        tipo = self.request.query_params.get('tipo', None)
        filtro = self.request.query_params.get('filtro', None)
        
        if filtro:
            tipos = EquipamentoTipos.objects.filter(nome__contains=filtro)
            queryset = queryset(Q(codigo_operacional__contains=filtro) | Q(tipo__in=tipos) | Q(descricao__contains=filtro) | Q(observacao__contains=filtro))
        
        if instalacao:
            queryset =  queryset.filter(instalacao=instalacao)
        
        if tipo:
            equipamento_tipo = EquipamentoTipos.objects.filter(nome=tipo)
            queryset =  queryset.filter(tipo__in=equipamento_tipo)
        
        return queryset.order_by('codigo_operacional')
        
        
class AlimentadoresViewSet(viewsets.ModelViewSet):
    queryset = Alimentadores.objects.all().order_by('codigo_operacional')
    serializer_class = AlimentadoresSerializer 
    pagination_class = LargeResultsSetPagination
    
    def get_queryset(self):        
        queryset = Alimentadores.objects
        filtro = self.request.query_params.get('filtro', None)
        instalacao = self.request.query_params.get('instalacao', None) 

        if instalacao:
            queryset = queryset(instalacao=instalacao)
        
        if filtro:
            disjuntor = Equipamentos.objects.filter(codigo_operacional__contains=filtro)
            queryset = queryset(Q(codigo_operacional__contains=filtro) | Q(nome__contains=filtro) | Q(disjuntor__in=disjuntor))
            
        return queryset.order_by('codigo_operacional')
    
            