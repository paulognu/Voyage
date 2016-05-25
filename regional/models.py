#-*- coding: utf-8 -*-

from mongoengine import Document
from mongoengine.fields import StringField, EmailField, ReferenceField,\
    ListField, DateTimeField, BooleanField, EmbeddedDocumentField, FloatField
    
from mongoengine.document import EmbeddedDocument 
    
    
class Unidades(Document):
    nome = StringField(required=True, unique=True, null=False, blank=False)
    sigla = StringField(required=True, unique=False, null=False, blank=False)
    descricao = StringField(null=True,blank=True)
    observacao = StringField(null=True, blank=True)
    
    
class Divisoes(Document):
    nome = StringField(required=True, unique=True, null=False, blank=False)
    sigla = StringField(required=True, unique=False, null=False, blank=False)
    unidade = ReferenceField(Unidades)
    descricao = StringField(null=True, blank=True)
    observacao = StringField(null=True, blank=True)
    
    
class Colaboradores(Document):
    matricula = StringField(required=True, unique=True, null=False, blank=False)
    nome_completo = StringField(required=True, null=False, blank=False)    
    email = EmailField(null=True, blank=True)
    divisao = ReferenceField(Divisoes, null=True)
    

class Equipes(Document):
    nome = StringField(required=True, unique=True, null=False, blank=False)
    sigla = StringField(required=True, unique=False, null=False, blank=False)
    divisao = ReferenceField(Divisoes)

    descricao = StringField(null=True, blank=True)
    observacao = StringField(null=True, blank=True)
    
    membros = ListField(ReferenceField(Colaboradores))


class InstalacaoTipos(Document):
    nome = StringField(unique=True, required=True, blank=False)   

    
class Instalacoes(Document):
    nome = StringField(required=True, unique=True)
    sigla = StringField(required=True, unique=True)
    unidade = ReferenceField(Unidades, required=False)
    tipo = ReferenceField(InstalacaoTipos, required=True) 
    
    
class EquipamentoTipos(Document):
    nome = StringField(unique=True, required=True)   
        
    
class MedidaAnalogica(EmbeddedDocument):
    aquisicao_automatica = BooleanField(default=True, required=False)
    fator = FloatField(default=1.0)
    referencia = StringField(default='-')
    valor_manual = StringField(default='-')    
        
    
class MedidaDigital(EmbeddedDocument):
    aquisicao_automatica = BooleanField(default=True, required=False)
    inversao = BooleanField(default=False)
    referencia = StringField(default='-')
    valor_manual = StringField(default='-')    
        
    
class Equipamentos(Document):
    codigo_operacional = StringField(unique=True, required=True)    
    observacao = StringField(null=True, blank=True)
    descricao = StringField(null=True, blank=True)    
    em_manutencao = BooleanField(default=False)
    desativado = DateTimeField(default=None, null=True)
    tipo = ReferenceField(EquipamentoTipos, required=True, blank=False)    
    instalacao = ReferenceField(Instalacoes)
    
    potencia_ativa = EmbeddedDocumentField(MedidaAnalogica, required=False)
    potencia_reativa = EmbeddedDocumentField(MedidaAnalogica, required=False)

    corrente_fase_a = EmbeddedDocumentField(MedidaAnalogica, required=False)
    corrente_fase_b = EmbeddedDocumentField(MedidaAnalogica, required=False)
    corrente_fase_v = EmbeddedDocumentField(MedidaAnalogica, required=False)
    
    posicao = EmbeddedDocumentField(MedidaDigital, required=False)
    
    
class Alimentadores(Document):
    codigo_operacional = StringField(unique=True, required=True)
    nome = StringField(required=False, null=False, blank=True)
    instalacao = ReferenceField(Instalacoes, required=True) 
    disjuntor = ReferenceField(Equipamentos, required=False, blank=True)
    observacao = StringField(null=True, blank=True)
    descricao = StringField(null=True, blank=True)    
            
