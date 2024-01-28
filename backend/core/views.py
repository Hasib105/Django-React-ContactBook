from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework.viewsets import ModelViewSet
from .models import Contact
from .serializers import ContactSerializer
# Create your views here.

class ContactViewSet(ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)