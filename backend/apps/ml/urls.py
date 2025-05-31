from django.urls import path
from .views import SentimentTrainView, SentimentPredictView

urlpatterns = [
    path('sentimiento/train', SentimentTrainView.as_view()),
    path('sentimiento/predict', SentimentPredictView.as_view()),
]
