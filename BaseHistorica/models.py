#!/usr/bin/env python3
#-*- coding: utf-8 -*-

"""
OBJETIVO: Facilitar a consulta aos dados da Base Histórica


INFORMAÇÕES GERAIS
==================

    AUTOR: João Paulo dos Santos Santos
    EMAIL: paulo.gnu@gmail.com
    CONTATO: +55 96 98127-3698
    DATA: Macapá/AP, 24 de Abril de 2016 as 14h36m

"""

from django.db import models

from datetime import datetime

"""
Entidades para consulta de valores análogicos
"""

class pas_ctrl(models.Model):
    """
    OBJETIVO: Mostrar as tabelas 'bhpas_h_' geradas na base histórica pelo script 'consolida_bh'    

    CAMPOS: 
        - bh_nome:        Nome da tabela gerada no formato 'bhpas_h_<ano>_<mês>_<dia>', e.g.: 'bhpas_h_2016_03_31'    
        - bh_estado:      Este campo é muito importante para consulta, pois ele informa se a tabela esta disponivel para consulta,
                          podendo assumir os valores de 'CARGA', 'ONLINE' e 'OFFLINE', sendo que as tabelas que se encontram com o estado
                          'OFFLINE'não estarão disponiveis para consulta, uma vez que estão arquivadas e excluidas do banco de dados.
        - bh_dthr:        Data e hora do registro
        - bh_dthr_inicio: Data e hora do inicio do registro 
        - bh_dthr_fim:    Data e hora do fim do registro 
     
    """
    bh_nome = models.CharField(max_length=24)          
    bh_estado = models.CharField(max_length=7)          
    bh_dthr = models.DateTimeField(primary_key=True)  
    bh_dthr_inicio = models.DateTimeField()            
    bh_dthr_fim = models.DateTimeField( )              
    bh_arquivo = models.CharField(max_length=1)
    
    def __str__(self):
        return self.bh_nome.strip()
    
    class Meta:
        managed = False
        app_label = "basehistorica"
        db_table = "bh_pas_h_ctl"
        

class pas_h(models.Model):
    """
    OBJETIVO: Consultar os valores referentes aos dados da 'PAS_H' armazenados históricamente
    
    CAMPOS:
        - bh_chave:    Representa um chave estrangeira, referente a tabela PAS_R (tabela com os pontos analogicos de referência)
        - bh_dthr:     Representa a data e hora do registro
        - valor:       Valor nominal no instânte do registro
        
    OBSERVAÇÃO: Para uitlizar esta tabela diretamente deverá ser informado por meio do campo 'bd_table' tabela que será consultada,
                uma vez que consulta é feita dinamicamente:
                
                e.g.:
                pas_h._meta.db_tabel = 'bhpas_h_2016_03_31'
                pas_h.objects.filter(bh_chave=1470).order_by('bh_dthr')    # O valor 1470 é refrente a um registro na tabela 'PAS_R'
        
    """
    
    bh_chave = models.IntegerField(primary_key=True)
    bh_dthr = models.DateTimeField(primary_key=True)
    valor = models.FloatField()
    
    def __str__(self):
        return "{0} - {1}".format(datetime.strftime(self.bh_dthr, "%d/%m/%Y %H:%M:%S"), self.valor)
    
    class Meta:
        managed = False
        app_label = "basehistorica"   
    
    
class pas_r(models.Model):
    """
    OBJETIVO: Consultar todos os pontos análogicos da tabela de referência PAS_R.
    
    CAMPOS:
        - id:        Representa o ID do ponto análogico, e.g.: 'SIAL2-01_P'. Obs.: Quando utilizar o valor deste campo, 
                     utilizar a função 'strip' para retirar qualquer espaço em branco que houver.
        - nome:      Descrição do ponto
        - estacao:   *
        - bh_chave:  Representação da chave primária
         
    
    """
    
    id = models.CharField(primary_key=True, max_length=255)
    nome = models.CharField(max_length=255)
    estacao = models.CharField(max_length=255)
    bh_chave = models.IntegerField()
    
    def consulta(self, bh_dthr_inicio=datetime.strptime('31/01/2015 00:00:00', '%d/%m/%Y %H:%M:%S'), bh_dthr_fim=datetime.strptime('31/05/2015 23:59:59', '%d/%m/%Y %H:%M:%S')):
        """
        OBJETIVO: Consulta os registros armazenados históricamente utiliando o valor de referência 'self.bh_chave', 
                  realiza consultas em multiplas tabelas('bhpas_h_yyyy_mm_dd') temporais utilizando UNION entre as 
                  mesmas e ordena os valores pelo campo 'bh_dthr' de forma ascendente. Os valores passados por 'bh_dthr_inicio'
                  e 'bh_dthr_fim', são utilizados como parametros de consulta, utilizados na consulta auxiliar por meio da entidade
                  'pas_ctrl', onde retorna apenas as tabelas existentes(com o valor do campo 'bh_estado' diferente de 'OFFLINE') 
                  entre este periodo.
                  
                  Consulta das tabelas existentes no banco de dados da base histórica
                  =================================================================== 
                  e.g.: pas_ctrl.objects.filter(bh_nome__gte='bhpas_h_2016_03_29', bh_nome__lte='bhpas_h_2016_03_31')
                            .exclude(bh_estado__regex=r'OFFLINE')
                            .order_by('bh_nome')
        
        """
        def gerar_sql(tabela, where=''):
            """
            OBJETIVO: Gerar o script SQL dinamicamente de acordo com a tabela e filtros de pesquisa.
            """
            sql = "SELECT bh_chave, bh_dthr, valor FROM {table} {where}"
            return sql.format(table=tabela, where=where)
        
        if not(isinstance(bh_dthr_inicio, datetime) and isinstance(bh_dthr_fim, datetime)):
            raise Exception(msg="Erro! Data não esta no formato válido!") 
        
        tabela_inicial = datetime.strftime(bh_dthr_inicio, "bhpas_h_%Y_%m_%d")
        tabela_final = datetime.strftime(bh_dthr_fim, "bhpas_h_%Y_%m_%d")
        tabelas = pas_ctrl.objects.filter(bh_nome__gte=tabela_inicial, bh_nome__lte=tabela_final).exclude(bh_estado__regex=r'OFFLINE').order_by('bh_nome')
        tabelas_len = len(tabelas)
        
        if tabelas_len > 0:
            
            consulta = '';    
                    
            if tabelas_len == 1:
                consulta = "({sql})".format(sql=gerar_sql(tabelas[0].bh_nome.strip(), "WHERE bh_chave = {bh_chave} AND bh_dthr BETWEEN '{datahora_inicio}' AND '{datahora_fim}'".format(bh_chave=self.bh_chave, datahora_inicio=datetime.strftime(bh_dthr_inicio, '%Y-%m-%d %H:%M:%S'), datahora_fim=datetime.strftime(bh_dthr_fim, '%Y-%m-%d %H:%M:%S'))))
                
            else:
                consulta = "({sql})".format(sql=gerar_sql(tabelas[0].bh_nome.strip(), "WHERE bh_chave = {bh_chave} AND bh_dthr >= '{datahora_inicio}'".format(bh_chave=self.bh_chave, datahora_inicio=datetime.strftime(bh_dthr_inicio, '%Y-%m-%d %H:%M:%S'))))
                
                for tabela in tabelas[1:tabelas_len -1]:
                    consulta += "\nUNION\n({sql})".format(sql=gerar_sql(tabela.bh_nome.strip(), where="WHERE bh_chave = {bh_chave}".format(bh_chave=self.bh_chave))) 
            
                consulta += "\nUNION\n({sql})".format(sql=gerar_sql(tabelas[tabelas_len-1].bh_nome.strip(), where="WHERE bh_chave = {bh_chave} AND bh_dthr <= '{datahora_fim}'".format(bh_chave=self.bh_chave, datahora_fim=datetime.strftime(bh_dthr_fim, '%Y-%m-%d %H:%M:%S'))))
                
            consulta += ' ORDER BY bh_dthr'
            
            return pas_h.objects.raw(consulta)
        
        else:
            return []
        
    
    def consulta_pascon_h(self, bh_dthr_inicio=datetime.strptime('31/01/2015 00:00:00', '%d/%m/%Y %H:%M:%S'), bh_dthr_fim=datetime.strptime('31/05/2015 23:59:59', '%d/%m/%Y %H:%M:%S')):
        resultado = pascon_h.objects.filter(bh_dthr__gte=bh_dthr_inicio, bh_dthr__lte=bh_dthr_fim, bh_chave=self.bh_chave).order_by('bh_dthr')
        
        return resultado
    
    
    class Meta:
        managed = False
        app_label = "basehistorica"
        db_table = "pas_r"
        
        
        
def testePAS_R():
    """
    OBJETIVO: Testar a consulta dos registro referente á um ponto análogico específico. e.g: 'SIAL2-01_P' no período de '28/03/2016 00:00:00'
              até '31/03/2016 23:59:59' 
    """        
    _teste = pas_r.objects.get(id='SIAL2-01_P')
    datahora_ini = datetime.strptime('28/03/2016 00:00:00', '%d/%m/%Y %H:%M:%S')
    datahora_fim = datetime.strptime('31/03/2016 23:59:59', '%d/%m/%Y %H:%M:%S')
    for r in _teste.consulta(datahora_ini, datahora_fim):
        print(r)
        
        
"""
Entidades para consulta de valores análogicos
"""

class pds_ctrl(models.Model):
    """
    OBJETIVO: Mostrar as tabelas 'bhpds_h_' geradas na base histórica pelo script 'consolida_bh'    

    CAMPOS: 
        - bh_nome:        Nome da tabela gerada no formato 'bhpds_h_<ano>_<mês>_<dia>', e.g.: 'bhpds_h_2016_03_31'    
        - bh_estado:      Este campo é muito importante para consulta, pois ele informa se a tabela esta disponivel para consulta,
                          podendo assumir os valores de 'CARGA', 'ONLINE' e 'OFFLINE', sendo que as tabelas que se encontram com o estado
                          'OFFLINE'não estarão disponiveis para consulta, uma vez que estão arquivadas e excluidas do banco de dados.
        - bh_dthr:        Data e hora do registro
        - bh_dthrinicio:  Data e hora do inicio do registro 
        - bh_dthr_inicio: Data e hora do inicio do registro 
     
    """
    bh_nome = models.CharField(max_length=24)          
    bh_estado = models.CharField(max_length=7)          
    bh_dthr = models.DateTimeField(primary_key=True)  
    bh_dthr_inicio = models.DateTimeField()            
    bh_dthr_fim = models.DateTimeField( )              
    bh_arquivo = models.CharField(max_length=1)
    
    def __str__(self):
        return self.bh_nome.strip()
    
    class Meta:
        managed = False
        app_label = "basehistorica"
        db_table = "bh_pds_h_ctl"
        

class pds_h(models.Model):
    """
    OBJETIVO: Consultar os valores referentes aos dados da 'PDS_H' armazenados históricamente
    
    CAMPOS:
        - bh_chave:    Representa um chave estrangeira, referente a tabela PDS_R (tabela com os pontos analogicos de referência)
        - bh_dthr:     Representa a data e hora do registro
        - bh_variacao: *
        - estado:      *
        
    OBSERVAÇÃO: Para uitlizar esta tabela diretamente deverá ser informado por meio do campo 'bd_table' tabela que será consultada,
                uma vez que consulta é feita dinamicamente:
                
                e.g.:
                pas_h._meta.db_tabel = 'bhpds_h_2016_03_31'
                pas_h.objects.filter(bh_chave=1470).order_by('bh_dthr')    # O valor 1470 é refrente a um registro na tabela 'PDS_R'
        
    """
    
    bh_chave = models.IntegerField(primary_key=True)
    bh_dthr = models.DateTimeField(primary_key=True)
    bh_variacao = models.IntegerField()
    estado = models.IntegerField()
    
    def consulta_estado(self):
        _estado = {
            "K_PDS_FLG_ESTAD": bool(self.estado & 1),
            "K_PDS_FLG_FOVAR": bool(self.estado & 2),
            "K_PDS_FLG_FALHA": bool(self.estado & 4),
            "K_PDS_FLG_IVORG": bool(self.estado & 8),
            "K_PDS_FLG_MAORG": bool(self.estado & 16),
            "K_PDS_FLG_MANUA": bool(self.estado & 32),
            "K_PDS_FLG_NINCI": bool(self.estado & 64),
            "K_PDS_FLG_FVORG": bool(self.estado & 8192),
        }
        
        return _estado
    
    def __str__(self):
        return "{0} - {1}".format(datetime.strftime(self.bh_dthr, "%d/%m/%Y %H:%M:%S"), self.consulta_estado())
    
    class Meta:
        managed = False
        app_label = "basehistorica"
        
        
class pds_r(models.Model):
    """
    OBJETIVO: Consultar todos os pontos análogicos da tabela de referência PDS_R.
    
    CAMPOS:
        - id:        Representa o ID do ponto análogico, e.g.: 'SIAL20181U1S'. Obs.: Quando utilizar o valor deste campo, 
                     utilizar a função 'strip' para retirar qualquer espaço em branco que houver.
        - nome:      Descrição do ponto
        - bh_chave:  Representação da chave primária
         
    
    """
    
    id = models.CharField(primary_key=True, max_length=255)
    nome = models.CharField(max_length=255)
    bh_chave = models.IntegerField()
    
    def consulta(self, bh_dthr_inicio=datetime.strptime('28/03/2016 00:00:00', '%d/%m/%Y %H:%M:%S'), bh_dthr_fim=datetime.strptime('31/03/2016 23:59:59', '%d/%m/%Y %H:%M:%S')):
        """
        OBJETIVO: Consulta os registros armazenados históricamente utiliando o valor de referência 'self.bh_chave', 
                  realiza consultas em multiplas tabelas('bhpds_h_yyyy_mm_dd') temporais utilizando UNION entre as 
                  mesmas e ordena os valores pelo campo 'bh_dthr' de forma ascendente. Os valores passados por 'bh_dthr_inicio'
                  e 'bh_dthr_fim', são utilizados como parametros de consulta, utilizados na consulta auxiliar por meio da entidade
                  'pds_ctrl', onde retorna apenas as tabelas existentes(com o valor do campo 'bh_estado' diferente de 'OFFLINE') 
                  entre este periodo.
                  
                  Consulta das tabelas existentes no banco de dados da base histórica
                  =================================================================== 
                  e.g.: pds_ctrl.objects.filter(bh_nome__gte='bhpds_h_2016_03_29', bh_nome__lte='bhpds_h_2016_03_31')
                            .exclude(bh_estado__regex=r'OFFLINE')
                            .order_by('bh_nome')
        
        """
        def gerar_sql(tabela, where=''):
            """
            OBJETIVO: Gerar o script SQL dinamicamente de acordo com a tabela e filtros de pesquisa.
            """
            sql = "SELECT bh_chave, bh_dthr, bh_variacao, estado FROM {table} {where}"
            return sql.format(table=tabela, where=where)
        
        if not(isinstance(bh_dthr_inicio, datetime) and isinstance(bh_dthr_fim, datetime)):
            raise Exception(msg="Erro! Data não esta no formato válido!") 
        
        tabela_inicial = datetime.strftime(bh_dthr_inicio, "bhpds_h_%Y_%m_%d")
        tabela_final = datetime.strftime(bh_dthr_fim, "bhpds_h_%Y_%m_%d")
        tabelas = pds_ctrl.objects.filter(bh_nome__gte=tabela_inicial, bh_nome__lte=tabela_final).exclude(bh_estado__regex=r'OFFLINE').order_by('bh_nome')
        tabelas_len = len(tabelas)
        
        if tabelas_len > 0:
            
            consulta = '';    
                    
            if tabelas_len == 1:
                consulta = "({sql})".format(sql=gerar_sql(tabelas[0].bh_nome.strip(), "WHERE bh_chave = {bh_chave} AND bh_dthr BETWEEN '{datahora_inicio}' AND '{datahora_fim}'".format(bh_chave=self.bh_chave, datahora_inicio=datetime.strftime(bh_dthr_inicio, '%Y-%m-%d %H:%M:%S'), datahora_fim=datetime.strftime(bh_dthr_fim, '%Y-%m-%d %H:%M:%S'))))
                
            else:
                consulta = "({sql})".format(sql=gerar_sql(tabelas[0].bh_nome.strip(), "WHERE bh_chave = {bh_chave} AND bh_dthr >= '{datahora_inicio}'".format(bh_chave=self.bh_chave, datahora_inicio=datetime.strftime(bh_dthr_inicio, '%Y-%m-%d %H:%M:%S'))))
                
                for tabela in tabelas[1:tabelas_len -1]:
                    consulta += "\nUNION\n({sql})".format(sql=gerar_sql(tabela.bh_nome.strip(), where="WHERE bh_chave = {bh_chave}".format(bh_chave=self.bh_chave))) 
            
                consulta += "\nUNION\n({sql})".format(sql=gerar_sql(tabelas[tabelas_len-1].bh_nome.strip(), where="WHERE bh_chave = {bh_chave} AND bh_dthr <= '{datahora_fim}'".format(bh_chave=self.bh_chave, datahora_fim=datetime.strftime(bh_dthr_fim, '%Y-%m-%d %H:%M:%S'))))
                
            consulta += ' ORDER BY bh_dthr'
            
            return pds_h.objects.raw(consulta)
        
        else:
            return []        

    
    class Meta:
        managed = False
        app_label = "basehistorica"
        db_table = "pds_r"
        
        
def testePDS_R():
    """
    OBJETIVO: Testar a consulta dos registro referente á um ponto digital específico. e.g: 'SIAL20181U1S' no período de '28/03/2016 00:00:00'
              até '31/03/2016 23:59:59' 
    """        
    _teste = pds_r.objects.get(id='SIAL20181U1S')
    datahora_ini = datetime.strptime('28/03/2016 00:00:00', '%d/%m/%Y %H:%M:%S')
    datahora_fim = datetime.strptime('31/03/2016 23:59:59', '%d/%m/%Y %H:%M:%S')
    for r in list(_teste.consulta(datahora_ini, datahora_fim)):
        print(r)
        
        
        
"""
Base consolidada
"""

class pascon_h(models.Model):
    """
    OBJETIVO: Consultar dados da base consolidada por horario    

    CAMPOS: 
        - bh_chave:    
        - bh_dthr:
        - med:
        - max:
        - max_dthr:
        - min:
        - min_dthr:
        - valor:
        - total_medidas:
     
    """
    
    bh_chave = models.IntegerField(primary_key=True)    
    bh_dthr = models.DateTimeField()
    med = models.FloatField()
    max = models.FloatField()
    max_dthr = models.DateTimeField()
    min = models.FloatField()
    min_dthr = models.DateTimeField()
    valor = models.FloatField()
    total_medidas = models.IntegerField()
        
    def to_dict(self):
        result = {
            'bh_chave': self.bh_chave,    
            'bh_dthr': datetime.strftime(self.bh_dthr, '%d/%m/%Y %H:%M'),
            'med': "{0:.1f}".format(self.med),
            'max': "{0:.1f}".format(self.max),
            'max_dthr': datetime.strftime(self.max_dthr, '%d/%m/%Y %H:%M:%S'),
            'min': "{0:.1f}".format(self.min),
            'min_dthr': datetime.strftime(self.min_dthr, '%d/%m/%Y %H:%M:%S'),
            'valor': "{0:.1f}".format(self.valor),
            'total_medidas': self.total_medidas,                  
        }    
        
        return result
    
#    def __str__(self):
#        return self.bh_nome.strip()
    
    class Meta:
        managed = False
        app_label = "baseconsolidada"
        db_table = "pascon_h"