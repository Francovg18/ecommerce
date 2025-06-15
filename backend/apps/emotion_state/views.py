from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
import os
import traceback
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import f1_score
from imblearn.over_sampling import SMOTE
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
# Variables globales
modelo_emocional = None
model_ready = False
columnas_modelo = None

class EmotionTrainView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        global modelo_emocional, model_ready, columnas_modelo
        try:
            # Cargar dataset
            path = os.path.join(settings.BASE_DIR, 'apps/emotion_state/data/emocional2.xlsx')
            df = pd.read_excel(path)

            df = df[df['Estado'].notna()]
            df = df[df['Estado'].astype(str).str.strip() != '']

            X = df.drop(columns=['Estado']).replace(r'^\s*$', np.nan, regex=True).astype(float)
            X = X.fillna(X.mean())
            y = df['Estado']

            columnas_modelo = X.columns.tolist()

            # Dividir y balancear
            X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
            smote = SMOTE(random_state=42)
            X_train_bal, y_train_bal = smote.fit_resample(X_train, y_train)

            # Entrenar modelo
            modelo_rf = RandomForestClassifier(random_state=42)
            modelo_rf.fit(X_train_bal, y_train_bal)

            modelo_emocional = modelo_rf
            model_ready = True

            return Response({'message': 'Modelo emocional entrenado correctamente'}, status=status.HTTP_200_OK)

        except Exception as e:
            traceback.print_exc()
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@method_decorator(csrf_exempt, name='dispatch')
class EmotionPredictView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [] 
    def post(self, request):
        global modelo_emocional, model_ready, columnas_modelo
        try:
            if not model_ready:
                return Response({'error': 'Modelo no entrenado'}, status=status.HTTP_400_BAD_REQUEST)

            respuestas = request.data.get('respuestas', [])
            if len(respuestas) != 15:
                return Response({'error': 'Se requieren exactamente 15 respuestas'}, status=status.HTTP_400_BAD_REQUEST)

            # Asegurar orden de columnas
            df_input = pd.DataFrame([respuestas], columns=columnas_modelo)
            pred = modelo_emocional.predict(df_input)[0]
            return Response({'estado_emocional': pred}, status=status.HTTP_200_OK)

        except Exception as e:
            traceback.print_exc()
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
