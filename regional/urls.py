from regional import views
from rest_framework_mongoengine.routers import DefaultRouter

router = DefaultRouter()
router.register(r'unidades', views.UnidadesViewSet)
router.register(r'divisoes', views.DivisoesViewSet)
router.register(r'colaboradores', views.ColaboradoresViewSet)
router.register(r'colaboradores-list', views.ColaboradoresListViewSet)
router.register(r'equipes', views.EquipesViewSet)
router.register(r'instalacao-tipos', views.InstalacaoTiposViewSet)
router.register(r'instalacoes', views.InstalacoesViewSet)
router.register(r'equipamento-tipos', views.EquipamentoTiposViewSet)
router.register(r'equipamentos', views.EquipamentosViewSet)
