# backend/core/serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers

from .models import UserSettings
from .models import PrivacySettings
from .models import NotificationSettings
from .models import AccountSettings
from .models import ThemeSetting

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        fields = '__all__'

class PrivacySettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrivacySettings
        fields = '__all__'
        read_only_fields = ['user']

class NotificationSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationSettings
        fields = '__all__'
        read_only_fields = ['user']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class AccountSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountSettings
        fields = ['fullname', 'dob', 'gender']

class FullAccountSettingsSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    fullname = serializers.CharField()
    dob = serializers.DateField()
    gender = serializers.CharField()
    aboutme = serializers.CharField(allow_blank=True, required=False)

    def update(self, instance, validated_data):
        user = instance.user
        user.username = validated_data.get("username", user.username)
        user.email = validated_data.get("email", user.email)
        user.save()

        instance.fullname = validated_data.get("fullname", instance.fullname)
        instance.dob = validated_data.get("dob", instance.dob)
        instance.gender = validated_data.get("gender", instance.gender)
        instance.aboutme = validated_data.get("aboutme", instance.aboutme)
        instance.save()
        return instance
    
class ChangePasswordSerializer(serializers.Serializer):
    oldPassword = serializers.CharField(required=True)
    newPassword = serializers.CharField(required=True)
    confirmPassword = serializers.CharField(required=True)

    def validate(self, data):
        user = self.context['request'].user

        if not user.check_password(data['oldPassword']):
            raise serializers.ValidationError({"oldPassword": "Incorrect old password"})

        if data['newPassword'] != data['confirmPassword']:
            raise serializers.ValidationError({"confirmPassword": "Passwords do not match"})

        return data
    

class ThemeSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThemeSetting
        fields = '__all__'