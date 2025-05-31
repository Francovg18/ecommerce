from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
import traceback
import os
import pandas as pd
import numpy as np
import re
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from scipy import sparse
from scipy.sparse import hstack
from sklearn.utils import resample

import pandas as pd
from scipy import sparse
from scipy.sparse import hstack

from .models import SentimentAnalysis
from .models import SentimentAnalysis
from django.conf import settings

# Variables globales
modelo_rf = None
vectorizer = None
scaler = None
atributos_categoricos_dummies = None
model_ready = False

def clean_text(text):
    text = re.sub(r'[^\x00-\x7F]+', '', text)
    text = re.sub(r'[^\w\s]', '', text)
    return text.lower()

def contiene_palabras_agresivas(texto):
    palabras = ["mierda", "asqueroso", "idiota", "maldito", "imbecil", "basura", "robo", "pésimo", "inútil"]
    return int(any(p in texto for p in palabras))

def classify_sentiment(rating):
    if rating == 1: return 'Agresivo'
    elif rating == 2: return 'Negativo'
    elif rating == 3: return 'Neutro'
    elif rating in [4, 5]: return 'Positivo'

class SentimentTrainView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        global modelo_rf, vectorizer, scaler, atributos_categoricos_dummies, model_ready

        try:
            path = os.path.join(settings.BASE_DIR, 'apps/ml/data/emocion.xlsx')
            comentarios = pd.read_excel(path)

            comentarios['Cleaned_Comment'] = comentarios['comentario'].apply(clean_text)
            comentarios['Sentiment'] = comentarios['calificacion'].apply(classify_sentiment)
            comentarios['flag_agresivo'] = comentarios['Cleaned_Comment'].apply(contiene_palabras_agresivas)

            df = comentarios[['Cleaned_Comment', 'Sentiment', 'flag_agresivo']]
            df_min = df[df['Sentiment'] == 'Agresivo']
            df_maj = df[df['Sentiment'] != 'Agresivo']

            df_min_up = resample(df_min, replace=True, n_samples=50, random_state=42)
            df_bal = pd.concat([df_maj, df_min_up])

            df_completo = pd.merge(df_bal, comentarios, on=['Cleaned_Comment', 'Sentiment', 'flag_agresivo'], how='left')

            atributos_numericos = df_completo[['precio_producto', 'categoria']]
            atributos_categoricos = df_completo[['producto', 'sucursal', 'tipo_mayorista']]
            atributos_categoricos_dummies = pd.get_dummies(atributos_categoricos, drop_first=True)

            scaler = StandardScaler()
            atributos_numericos_scaled = scaler.fit_transform(atributos_numericos)

            X_vec = TfidfVectorizer()
            X_text = X_vec.fit_transform(df_completo['Cleaned_Comment'])
            vectorizer = X_vec
            X_flag = df_completo['flag_agresivo'].values.reshape(-1, 1)

            X_final = hstack([
                X_text,
                sparse.csr_matrix(X_flag),
                sparse.csr_matrix(atributos_numericos_scaled),
                sparse.csr_matrix(atributos_categoricos_dummies.values)
            ])
            y = df_completo['Sentiment']

            X_train, _, y_train, _ = train_test_split(X_final, y, test_size=0.2, random_state=42)
            modelo_rf = RandomForestClassifier(n_estimators=100, random_state=42)
            modelo_rf.fit(X_train, y_train)

            model_ready = True
            return Response({'message': 'Modelo entrenado correctamente'}, status=status.HTTP_200_OK)

        except Exception as e:
            print("❌ ERROR ENTRENAMIENTO:")
            traceback.print_exc()
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


TIPO_MAYORISTA_MAP = {
                0: 'cliente_normal',
                1: 'mayorista_1',
                2: 'mayorista_2',
                3: 'mayorista_3'
}
class SentimentPredictView(APIView):
    
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        global modelo_rf, vectorizer, scaler, atributos_categoricos_dummies, model_ready

        if not model_ready:
            return Response({'error': 'Modelo no entrenado'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            comment = request.data.get('comment', '').strip()
            if not comment:
                return Response({'error': 'Comentario vacío'}, status=status.HTTP_400_BAD_REQUEST)

            cleaned = clean_text(comment)
            flag = contiene_palabras_agresivas(cleaned)
            
            precio = 15.0
            categoria = 1
            producto = "Pasta Dental"
            sucursal = "La Paz"
            tipo = TIPO_MAYORISTA_MAP.get(request.user.mayorista_tipo, 'cliente_normal')

            vec = vectorizer.transform([cleaned])

            num_df = pd.DataFrame([{
                "precio_producto": precio,
                "categoria": categoria
            }])
            num_scaled = scaler.transform(num_df)

            cat_df = pd.DataFrame([{
                'producto': producto,
                'sucursal': sucursal,
                'tipo_mayorista': tipo
            }])
            dummies = pd.get_dummies(cat_df)
            faltantes = list(set(atributos_categoricos_dummies.columns) - set(dummies.columns))
            faltantes_df = pd.DataFrame(0, index=[0], columns=faltantes)
            dummies = pd.concat([dummies, faltantes_df], axis=1)
            dummies = dummies[atributos_categoricos_dummies.columns]
            dummies = dummies.astype(np.float64)
            X_final = hstack([
                vec,
                sparse.csr_matrix([[flag]]),
                sparse.csr_matrix(num_scaled),
                sparse.csr_matrix(dummies.values)
            ])

            pred = modelo_rf.predict(X_final)[0]
            # 🔍 Aumentar faltas si es agresivo
            if pred == "Agresivo":
                request.user.faltas_agresivas += 1
                if request.user.faltas_agresivas >= 3:
                    request.user.is_active = False
                request.user.save()

            proba = modelo_rf.predict_proba(X_final)[0]
            idx_agresivo = list(modelo_rf.classes_).index("Agresivo")
            prob_agresivo = proba[idx_agresivo]

            SentimentAnalysis.objects.create(
                user=request.user,
                comment=comment,
                cleaned_comment=cleaned,
                sentiment=pred,
                probability_agresivo=prob_agresivo,
                producto=producto,
                sucursal=sucursal,
                tipo_mayorista=tipo,
                categoria=categoria,
                precio_producto=precio,
                flag_agresivo=bool(flag)
            )

            return Response({
                'prediction': pred,
                'prob_agresivo': round(prob_agresivo, 3),
                'faltas_agresivas': request.user.faltas_agresivas,
                'suspendido': not request.user.is_active
            }, status=status.HTTP_200_OK)


        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
