import json
from django.views import View
from django.http import JsonResponse, HttpResponseNotAllowed
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from .models import QRPayment

STATIC_QR_PATH = "qr_codes/qr.png"
STATIC_QR_URL = f"{settings.MEDIA_URL}{STATIC_QR_PATH}"


@method_decorator(csrf_exempt, name="dispatch")
class GenerateQRView(View):
    def dispatch(self, request, *args, **kwargs):
        if request.method != "POST":
            return HttpResponseNotAllowed(["POST"])
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        try:
            data = json.loads(request.body)
            amount = data.get("amount")
            reference = data.get("reference")

            if not amount or not reference:
                return JsonResponse({"error": "Monto y referencia son requeridos"}, status=400)

            qr_payment = QRPayment.objects.create(
                amount=amount,
                reference=reference,
                status="pending",
                qr_code_url=STATIC_QR_URL,
                qr_code=STATIC_QR_PATH,
            )

            return JsonResponse(
                {"qr_code_url": qr_payment.qr_code_url, "reference": reference},
                status=201,
            )
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


@method_decorator(csrf_exempt, name="dispatch")
class VerifyPaymentView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            reference = data.get("reference")

            if not reference:
                return JsonResponse({'error': 'Referencia requerida'}, status=400)

            payment = QRPayment.objects.get(reference=reference)

            if payment.status == 'paid':
                return JsonResponse({'success': True, 'message': 'Pago confirmado'}, status=200)
            else:
                return JsonResponse({'success': False, 'message': 'Pago aún no recibido'}, status=200)
        except QRPayment.DoesNotExist:
            return JsonResponse({'error': 'Referencia no encontrada'}, status=404)
