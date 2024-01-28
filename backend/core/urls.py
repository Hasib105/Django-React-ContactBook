from django.urls import path
from rest_framework import routers
from .views import ContactViewSet
router = routers.DefaultRouter()
router.register('contacts',ContactViewSet, basename = 'contact')

urlpatterns = router.urls



