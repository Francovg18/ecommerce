from django.urls import path
from .views import *


urlpatterns = [
    path('', User_registerCreateView.as_view()),
]