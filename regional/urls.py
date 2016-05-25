from regional import views as regional_views

from rest_framework_mongoengine.routers import DefaultRouter

router = DefaultRouter()
router.register(r'unidades', regional_views.UnidadesViewSet)
router.register(r'divisoes', regional_views.DivisoesViewSet)
router.register(r'colaboradores', regional_views.ColaboradoresViewSet)
router.register(r'colaboradores-list', regional_views.ColaboradoresListViewSet)
router.register(r'equipes', regional_views.EquipesViewSet)
router.register(r'instalacao-tipos', regional_views.InstalacaoTiposViewSet)
router.register(r'instalacoes', regional_views.InstalacoesViewSet)
router.register(r'equipamento-tipos', regional_views.EquipamentoTiposViewSet)
router.register(r'equipamentos', regional_views.EquipamentosViewSet)
router.register(r'alimentadores', regional_views.AlimentadoresViewSet)
