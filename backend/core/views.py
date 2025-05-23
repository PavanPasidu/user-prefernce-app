from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
# from django.views.decorators.csrf import csrf_exempt

from .serializers import UserSerializer, UserSettingsSerializer, PrivacySettingsSerializer
from .models import UserSettings, PrivacySettings
from rest_framework_simplejwt.tokens import RefreshToken
from .models import NotificationSettings
from .serializers import NotificationSettingsSerializer
from .models import AccountSettings
from .serializers import FullAccountSettingsSerializer
from django.contrib.auth import update_session_auth_hash
from .serializers import ChangePasswordSerializer
from .models import ThemeSetting
from .serializers import ThemeSettingsSerializer

# @csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password, email=email)
    UserSettings.objects.create(user=user)
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


# @csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_settings(request):
    user = request.user
    try:
        settings = UserSettings.objects.get(user=user)
    except UserSettings.DoesNotExist:
        settings = UserSettings.objects.create(user=user)
    serializer = UserSettingsSerializer(settings)
    return Response(serializer.data)


@api_view(['PUT', 'POST'])
@permission_classes([IsAuthenticated])
def update_user_settings(request):
    user = request.user
    try:
        settings = UserSettings.objects.get(user=user)
    except UserSettings.DoesNotExist:
        settings = UserSettings.objects.create(user=user)

    serializer = UserSettingsSerializer(settings, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_privacy_settings(request):
    user = request.user
    if user.is_anonymous:
        return Response({"detail": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        settings = PrivacySettings.objects.get(user=user)
    except PrivacySettings.DoesNotExist:
        settings = PrivacySettings(user=user)

    serializer = PrivacySettingsSerializer(settings, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response({"detail": "Privacy settings updated"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_privacy_settings(request):
    user = request.user
    try:
        settings = PrivacySettings.objects.get(user=user)
        serializer = PrivacySettingsSerializer(settings)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except PrivacySettings.DoesNotExist:
        return Response({}, status=status.HTTP_200_OK)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notification_settings(request):
    user = request.user
    try:
        settings = NotificationSettings.objects.get(user=user)
        serializer = NotificationSettingsSerializer(settings)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except NotificationSettings.DoesNotExist:
        return Response({}, status=status.HTTP_200_OK)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_notification_settings(request):
    user = request.user
    if user.is_anonymous:
        return Response({"detail": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        settings = NotificationSettings.objects.get(user=user)
    except NotificationSettings.DoesNotExist:
        settings = NotificationSettings(user=user)

    serializer = NotificationSettingsSerializer(settings, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response({"detail": "Notification settings updated"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def account_settings_view(request):
    user = request.user
    try:
        settings = user.account_settings
    except AccountSettings.DoesNotExist:
        settings = AccountSettings.objects.create(user=user)

    if request.method == 'GET':
        data = {
            'username': user.username,
            'email': user.email,
            'fullname': settings.fullname,
            'dob': settings.dob,
            'gender': settings.gender
        }
        return Response(data)

    elif request.method == 'POST':
        serializer = FullAccountSettingsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.update(settings, serializer.validated_data)
            return Response({"message": "Account settings updated successfully"})
        return Response(serializer.errors, status=400)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    serializer = ChangePasswordSerializer(data=request.data, context={"request": request})
    if serializer.is_valid():
        user = request.user
        user.set_password(serializer.validated_data['newPassword'])
        user.save()
        update_session_auth_hash(request, user)
        return Response({"message": "Password updated successfully"})
    return Response(serializer.errors, status=400)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def theme_settings_view(request):
    user = request.user
    try:
        settings = user.theme_setting
    except ThemeSetting.DoesNotExist:
        settings = ThemeSetting.objects.create(user=user)

    if request.method == 'GET':
        serializer = ThemeSettingsSerializer(settings)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ThemeSettingsSerializer(settings, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Theme settings updated successfully"})
        return Response(serializer.errors, status=400)