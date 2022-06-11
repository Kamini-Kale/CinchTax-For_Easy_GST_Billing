from django.db import models

# Create your models here.
class Contact(models.Model):
    name1 = models.CharField(max_length=122)
    email1 = models.CharField(max_length=122)
    desc = models.TextField()
   
class GstBill(models.Model):
    invoiceno = models.CharField(max_length=12)
    invoicedate = models.CharField(max_length=12)
    gstno = models.CharField(max_length=12)
    sgst = models.CharField(max_length=12)
    cgst = models.CharField(max_length=12)
    igst = models.CharField(max_length=12)
    total_amount = models.CharField(max_length=18)
