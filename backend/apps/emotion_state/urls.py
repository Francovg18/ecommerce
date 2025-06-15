from django.urls import path
from .views import EmotionTrainView, EmotionPredictView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('train/', EmotionTrainView.as_view(), name='emotion-train'),
    path('predict/', csrf_exempt(EmotionPredictView.as_view()), name='emotion-predict'),
]
