# views.py
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render, redirect
from .forms import RegisterForm, LoginForm


def home(request):
    context = {'user': request.user}
    return render(request, 'register/base.html', context)

def explore(request):
    context = {'user': request.user}
    return render(request, 'register/explore.html', context)



def register(response):
    if response.method == "POST":
        form = RegisterForm(response.POST)
        if form.is_valid():
            form.save()

        return redirect("/home")
    else:
        form = RegisterForm()

    return render(response, "register/register.html", {"form": form})


def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = authenticate(
                request,
                username=form.cleaned_data['username'],
                password=form.cleaned_data['password'],
            )
            if user is not None:
                login(request, user)
                return redirect('home')
    else:
        form = AuthenticationForm()
    return render(request, 'register/login.html', {'form': form})

# To show logged in user
# def my_view(request):
#   username = request.user.username
#  return render(request, 'register/home.html', {'username': username})
