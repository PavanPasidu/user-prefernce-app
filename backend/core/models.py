# backend/core/models.py
from django.db import models
import json
from django.contrib.auth.models import User ####

class UserSettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='settings')
    privacy_settings = models.TextField(default='{}', blank=True)
    notification_settings = models.TextField(default='{}', blank=True)
    account_settings = models.TextField(default='{}', blank=True)

    def get_privacy(self):
        return json.loads(self.privacy_settings)

    def get_notification(self):
        return json.loads(self.notification_settings)

    def get_account(self):
        return json.loads(self.account_settings)

    def set_privacy(self, data):
        self.privacy_settings = json.dumps(data)

    def set_notification(self, data):
        self.notification_settings = json.dumps(data)

    def set_account(self, data):
        self.account_settings = json.dumps(data)

    def __str__(self):
        return f"{self.user.username} Settings"


class PrivacySettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    profile_pic_visibility = models.CharField(max_length=20, default="everyone")
    profile_pic_download = models.CharField(max_length=20, default="everyone")
    account_privacy = models.CharField(max_length=20, default="public")
    connection_requests = models.CharField(max_length=30, default="everyone")
    data_retention = models.CharField(max_length=20, default="1_month")
    data_export = models.CharField(max_length=20, default="full")
    search_engine_visibility = models.BooleanField(default=False)
    third_party_access = models.BooleanField(default=False)
    active_status_visibility = models.BooleanField(default=False)
    profile_view_tracking = models.BooleanField(default=False)
    accept_tos = models.BooleanField(default=True)
    accept_privacy_policy = models.BooleanField(default=True)

    def __str__(self):
        return f"Privacy Settings for {self.user.username}"
    
class NotificationSettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    muteAll = models.BooleanField(default=False)

    emailNotify = models.BooleanField(default=True)
    smsNotify = models.BooleanField(default=False)
    pushNotify = models.BooleanField(default=True)

    volumeSlider = models.PositiveSmallIntegerField(default=68)  # 0 to 100

    toneSelect = models.CharField(max_length=50, default="pop_alert")

    dndStart = models.TimeField(default="22:00:00")
    dndEnd = models.TimeField(default="07:00:00")

    notifyFreq = models.CharField(
        max_length=20,
        choices=[("instant", "Instant"), ("hourly", "Hourly"), ("daily", "Daily Summary")],
        default="instant",
    )

    langSelect = models.CharField(
        max_length=20,
        choices=[("english", "English"), ("spanish", "Spanish"), ("german", "German")],
        default="english",
    )

    desktopNotify = models.BooleanField(default=True)

    def __str__(self):
        return f"Notification Settings for {self.user.username}"
    

class AccountSettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="account_settings")
    fullname = models.CharField(max_length=100)
    dob = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=[("Male", "Male"), ("Female", "Female"), ("Other", "Other")])

    def __str__(self):
        return f"{self.user.username}'s Account Settings"
    

class ThemeSetting(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='theme_setting')

    primary_color = models.CharField(max_length=20, default="#000000")
    secondary_color = models.CharField(max_length=20, default="#2ecc71")
    background_color = models.CharField(max_length=20, default="#ffffff")

    font_family = models.CharField(max_length=100, default="Arial")
    font_size = models.CharField(max_length=10, default="14px")
    primary_font_color = models.CharField(max_length=20, default="#474747")
    secondary_font_color = models.CharField(max_length=20, default="#303030")

    layout_style = models.CharField(max_length=20, default="compact")
    dark_mode = models.BooleanField(default=False)
    Custom_mode = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username}'s Theme Settings"