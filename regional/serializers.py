#!/usr/bin/env python3
#-*- coding: utf-8 -*-
from regional.models import Unidades, Divisoes, Colaboradores, Equipes,\
    Instalacoes, Equipamentos, InstalacaoTipos, EquipamentoTipos

from rest_framework.fields import SerializerMethodField
from rest_framework.reverse import reverse
from rest_framework_mongoengine.serializers import DocumentSerializer
from django.forms.models import fields_for_model


class UnidadesSerializer(DocumentSerializer):
    links = SerializerMethodField()
    
    class Meta:
        model = Unidades
        
    def get_links(self, obj):
        request = self.context['request']
        
        return {
            'self': reverse('unidades-detail', kwargs={'id': obj.pk}, request=request),
        }
        
        
class DivisoesSerializer(DocumentSerializer):
    links = SerializerMethodField()

    class Meta:
        model = Divisoes
        
    def get_links(self, obj):
        request = self.context['request']
        
        _links = {
            'self': reverse('divisoes-detail', kwargs={'id': obj.pk}, request=request),
        }
        
        if obj.unidade:
            _links['unidade'] = reverse('unidades-detail', kwargs={'id': obj.unidade.pk}, request=request)
            
        return _links
    
                
class ColaboradoresSerializer(DocumentSerializer):
    links = SerializerMethodField()
    divisao_sigla = SerializerMethodField()

    class Meta:
        model = Colaboradores
        
    def get_links(self, obj):
        request = self.context['request']
        
        _links = {
            'self': reverse('colaboradores-detail', kwargs={'id': obj.pk}, request=request),
            'divisao': None,
            'unidade': None
        }
        
        if obj.divisao:
            _links['divisao'] = reverse('divisoes-detail', kwargs={'id': obj.divisao.pk}, request=request)                
            if obj.divisao.unidade:
                _links['unidade'] = reverse('unidades-detail', kwargs={'id': obj.divisao.unidade.pk}, request=request)
                
        return _links      

    
    def get_divisao_sigla(self, obj):
        
        return obj.divisao.sigla if obj and obj.divisao else None

class ColaboradoresListSerializer(DocumentSerializer):
    value = SerializerMethodField()
    label = SerializerMethodField()
    
    class Meta:
        model = Colaboradores
        fields = ('value', 'label')
        
    def get_value(self, obj):
        return str(obj.id) if obj else None

    def get_label(self, obj):
        return "{0} - {1}".format(obj.matricula, obj.nome_completo) if obj else None
    
                
class EquipesSerializer(DocumentSerializer):
    links = SerializerMethodField()
    divisao_sigla = SerializerMethodField()
    membros_teste = SerializerMethodField()

    class Meta:
        model = Equipes
        
    def get_links(self, obj):
        request = self.context['request']
        
        _links = {
            'self': reverse('equipes-detail', kwargs={'id': obj.pk}, request=request),
            'divisao': None,
            'unidade': None,
        }
        
        if obj.divisao:
            _links['divisao'] = reverse('divisoes-detail', kwargs={'id': obj.divisao.pk}, request=request)                
            if obj.divisao.unidade:
                _links['unidade'] = reverse('unidades-detail', kwargs={'id': obj.divisao.unidade.pk}, request=request)
                
        return _links      
    
    def get_divisao_sigla(self, obj):
        
        return obj.divisao.sigla if obj and obj.divisao else None
    
    def get_membros_teste(self, obj):
        
        return [{'value': str(membro.id), 'label': '{0} - {1}'.format(membro.matricula, membro.nome_completo)} for membro in obj.membros ] if obj and obj.membros else None


class InstalacaoTiposSerializer(DocumentSerializer):
    links = SerializerMethodField()
    
    class Meta:
        model = InstalacaoTipos
        
    def get_links(self, obj):
        request = self.context['request']
        
        _links = {
            'self': reverse('instalacaotipos-detail', kwargs={'id': obj.pk}, request=request),
        }
        
        return _links
            
                
class InstalacoesSerializer(DocumentSerializer):
    links = SerializerMethodField()
    unidade_nome = SerializerMethodField()
    unidade_sigla = SerializerMethodField()
    tipo_nome = SerializerMethodField()
    
    class Meta:
        model = Instalacoes
        
    def get_links(self, obj):
        request = self.context['request']
        
        _links = {
            'self': reverse('instalacoes-detail', kwargs={'id': obj.pk}, request=request),
        }
        
        return _links
    
    def get_unidade_nome(self, obj):        
        return obj.unidade.nome if obj.unidade else None
    
    def get_unidade_sigla(self, obj):        
        return obj.unidade.sigla if obj.unidade else None
    
    def get_tipo_nome(self, obj):
        return obj.tipo.nome if obj.tipo else None
    
    
class EquipamentoTiposSerializer(DocumentSerializer):
    links = SerializerMethodField()
    
    class Meta:
        model = EquipamentoTipos
        
    def get_links(self, obj):
        request = self.context['request']
        
        _links = {
            'links': reverse('equipamentotipos-detail', kwargs={'id': obj.pk}, request=request)
        }
        
        return _links
    
    
class EquipamentosSerializer(DocumentSerializer):
    links = SerializerMethodField()
    tipo_nome = SerializerMethodField()
    instalacao_nome = SerializerMethodField()
    instalacao_sigla = SerializerMethodField()
    
    class Meta:
        model = Equipamentos
        
    def get_links(self, obj):
        request = self.context['request']
        
        _links = {
            'self': reverse('equipamentos-detail', kwargs={'id': obj.pk}, request=request),
        }
        
        return _links
    
    def get_instalacao_nome(self, obj):        
        return obj.instalacao.nome if obj.instalacao else None
    
    def get_instalacao_sigla(self, obj):        
        return obj.instalacao.sigla if obj.instalacao else None
    
    def get_tipo_nome(self, obj):
        return obj.tipo.nome if obj.tipo else None    
