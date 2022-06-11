from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from datetime import datetime

from .forms import CreateUserForm
from app.models import Contact
from app.models import GstBill
from app.filters import GstFilter


# Create your views here.
def index(request):
	return render(request, "index.html")


def about(request):
	return render(request, "about.html")

def Balancesheet(request):
	allBalance = GstBill.objects.all()
	context = {'balances': allBalance}
	return render(request, "Balancesheet.html", context)

def inventory(request):
	allInvoice = GstBill.objects.all()
	myFilter = GstFilter(request.GET, queryset=allInvoice)
	allInvoice = myFilter.qs
	context = {'invoices': allInvoice,'myFilter': myFilter}
	return render(request, "inventory.html", context)


def contact(request):
	if request.method == "POST":
		name1 = request.POST.get('name1')
		email1 = request.POST.get('email1')
		desc = request.POST.get('desc')
		contact = Contact(name1=name1, email1=email1, desc=desc)
		contact.save()

	return render(request, "contact.html")


def dashboard(request):
	return render(request, "dashboard.html")


def gstbill(request):
	if request.method == "POST":
		invoiceno = request.POST.get('invoiceno')
		invoicedate = request.POST.get('invoicedate')
		gstno = request.POST.get('gstno')
		sgst = request.POST.get('sgst')
		cgst = request.POST.get('cgst')
		igst = request.POST.get('igst1')
		total_amount = request.POST.get('total_amount')
		gstbill = GstBill(invoiceno=invoiceno, invoicedate=invoicedate, gstno=gstno, sgst=sgst, cgst=cgst, igst=igst,
						  total_amount=total_amount)
		gstbill.save()

	return render(request, "gstbill.html")


def register(request):
	if request.user.is_authenticated:
		return redirect('index')
	else:
		form = CreateUserForm()
		if request.method == 'POST':
			form = CreateUserForm(request.POST)
			if form.is_valid():
				form.save()
				user = form.cleaned_data.get('username')
				messages.success(request, 'Account was created for ' + user)

				return redirect('login')

		context = {'form': form}
		return render(request, 'register.html', context)


def login(request):
	if request.user.is_authenticated:
		return redirect('index')
	else:
		if request.method == 'POST':
			username = request.POST.get('username')
			password = request.POST.get('password')

			user = authenticate(request, username=username, password=password)

			if user is not None:
				login(request, user)
				return redirect('index')
			else:
				messages.info(request, 'Username OR password is incorrect')

		context = {}
		return render(request, 'login.html', context)


def logoutUser(request):
	logout(request)
	return redirect('index')


@login_required(login_url='login')
def home(request):
	return render(request, 'dashboard.html')
