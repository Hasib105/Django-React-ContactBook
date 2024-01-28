from django.urls import path
from rest_framework import routers
from .views import ContactViewSet , hello_world
router = routers.DefaultRouter()
router.register('contacts',ContactViewSet, basename = 'contact')

urlpatterns = router.urls + [
    path('hello-world/', hello_world, name='hello_world'),
]



