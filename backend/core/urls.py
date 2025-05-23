# from django.contrib import admin 
# from django.urls import path
# from. import views

# urlpatterns = [ 
#     path('', views.getData), 
# ]
# backend/core/urls.py
from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # refresh

    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('settings/', views.get_user_settings, name='get_settings'),
    path('settings/update/', views.update_user_settings, name='update_settings'),
    path('save-privacy-settings/', views.save_privacy_settings, name='save_privacy_settings'),
    path('get-privacy-settings/', views.get_privacy_settings, name='get_privacy_settings'),
    path('get-notification-settings/', views.get_notification_settings, name='get_notification_settings'),
    path('save-notification-settings/', views.save_notification_settings, name='save_notification_settings'),
    path('account/settings/', views.account_settings_view, name='account-settings'),
    path('account/change-password/', views.change_password, name='change-password'),
    path('theme-settings/', views.theme_settings_view, name='theme-settings'),
]

