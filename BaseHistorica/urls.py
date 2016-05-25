#-*- coding: utf-8 -*-

from rest_framework.routers import DefaultRouter
from BaseHistorica import views

router = DefaultRouter()
router.register(r'pas_r', views.pas_rViewSet)
router.register(r'pds_r', views.pds_rViewSet)
