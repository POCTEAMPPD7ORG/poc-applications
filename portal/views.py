from django.http import HttpResponse
from django.template import loader


def portal(request):
    template = loader.get_template('portal.html')
    return HttpResponse(template.render())


def index(request):
    template = loader.get_template('index.html')
    return HttpResponse(template.render())
