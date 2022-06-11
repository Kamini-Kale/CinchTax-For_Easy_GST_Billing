from django.contrib import admin
from app.models import Contact
from app.models import GstBill
# Register your models here.
admin.site.register(Contact),
admin.site.register(GstBill)