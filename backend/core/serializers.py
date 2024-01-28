from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Contact
        fields = ['id', 'user', 'name', 'number', 'image', 'division']
        read_only_fields = ['user']