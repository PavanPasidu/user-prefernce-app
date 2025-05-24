from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import update_session_auth_hash
from django.conf import settings
from django.core.files.storage import default_storage

from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
# from django.views.decorators.csrf import csrf_exempt

from .serializers import UserSerializer, UserSettingsSerializer, PrivacySettingsSerializer
from .models import UserSettings, PrivacySettings
from .models import NotificationSettings
from .serializers import NotificationSettingsSerializer
from .models import AccountSettings
from .serializers import FullAccountSettingsSerializer
from .serializers import ChangePasswordSerializer
from .models import ThemeSetting
from .serializers import ThemeSettingsSerializer
from .models import Profile

import os

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
        # print(settings)
    except AccountSettings.DoesNotExist:
        settings = AccountSettings.objects.create(user=user)

    if request.method == 'GET':
        data = {
            'username': user.username,
            'email': user.email,
            'fullname': settings.fullname,
            'dob': settings.dob,
            'gender': settings.gender,
            'aboutme': settings.aboutme,
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
    


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_profile_image(request):
    image = request.FILES.get('image')
    if not image:
        return Response({"error": "No image uploaded."}, status=400)

    user = request.user
    user_folder = os.path.join(settings.MEDIA_ROOT, str(user.id))
    # print("User ID:", user.id)

    if not os.path.exists(user_folder):
        os.makedirs(user_folder)

    # Clear old images in user folder
    for file in os.listdir(user_folder):
        file_path = os.path.join(user_folder, file)
        if os.path.isfile(file_path):
            os.remove(file_path)

    image_path = os.path.join(user_folder, image.name)
    with default_storage.open(image_path, 'wb+') as dest:
        for chunk in image.chunks():
            dest.write(chunk)

    image_url = request.build_absolute_uri(settings.MEDIA_URL + f"{str(user.id)}/{image.name}")
    return Response({"filePath": image_url}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_profile_image(request):
    user = request.user
    user_folder = os.path.join(settings.MEDIA_ROOT, str(user.id))

    if os.path.exists(user_folder):
        for file in os.listdir(user_folder):
            file_path = os.path.join(user_folder, file)
            if os.path.isfile(file_path):
                os.remove(file_path)
        return Response({"detail": "Image removed."})
    
    return Response({"error": "No image found to remove."}, status=404)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_profile_image(request):
    user = request.user
    user_folder = os.path.join(settings.MEDIA_ROOT, str(user.id))

    if os.path.exists(user_folder):
        for file in os.listdir(user_folder):
            file_path = os.path.join(user_folder, file)
            if os.path.isfile(file_path):
                # convert local path to URL:
                relative_path = os.path.relpath(file_path, settings.MEDIA_ROOT)
                image_url = request.build_absolute_uri(settings.MEDIA_URL + relative_path.replace("\\", "/"))
                return Response({"image_url": image_url})

    return Response({"image_url": None})




