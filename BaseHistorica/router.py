#!/usr/bin/env python3
#-*- coding: utf-8 -*-

class consultaBDHRouter(object):
    def db_for_read(self, model, *hints):
        if model._meta.app_label == 'basehistorica':
            return 'basehistorica'
        elif model._meta.app_label == 'baseconsolidada':
            return 'baseconsolidada'
        
        return None
        
    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'basehistorica':
            return 'basehistorica'
        elif model._meta.app_label == 'baseconsolidada':
            return 'baseconsolidada'

        return None
    
    def allow_relations(self, obj1, obj2, **hints):
        if obj1._meta.app_label == 'basehistorica' or obj1._meta.app_label == 'baseconsolidada':
            return True
        
        return None
    
    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'basehistorica':
            return db == "basehistorica"
        elif app_label == 'baseconsolidada':
            return db == 'baseconsolidada'
        
        return None           
        