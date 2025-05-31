from import_export import resources, fields
from import_export.widgets import ForeignKeyWidget
from .models import Product, Category, Brand


class ProductResource(resources.ModelResource):
    category = fields.Field(
        column_name='category',
        attribute='category',
        widget=ForeignKeyWidget(Category, 'id')
    )
    brand = fields.Field(
        column_name='brand',
        attribute='brand',
        widget=ForeignKeyWidget(Brand, 'id')
    )

    class Meta:
        model = Product
        exclude = ('date_created', 'sold')

    def before_import_row(self, row, **kwargs):
        #Ignora 'id'
        row.pop('id', None)
