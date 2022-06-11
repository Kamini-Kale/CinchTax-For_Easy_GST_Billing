import django_filters

from app.models import GstBill


class GstFilter(django_filters.FilterSet):
    class Meta:
        model = GstBill
        fields = '__all__'
