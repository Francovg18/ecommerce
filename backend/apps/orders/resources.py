# resources.py

from import_export import resources, fields
from import_export.widgets import ForeignKeyWidget
from .models import Order
from django.contrib.auth import get_user_model

User = get_user_model()

class OrderResource(resources.ModelResource):
    user = fields.Field(
        column_name='user',
        attribute='user',
        widget=ForeignKeyWidget(User, 'id')
    )

    class Meta:
        model = Order
        exclude = ('date_issued',)
        import_id_fields = ('transaction_id',)
        skip_unchanged = True
        report_skipped = False
        import_order = ()

    def before_import_row(self, row, **kwargs):
        raise Exception("Importación no permitida.")
