import json
from django.http import JsonResponse, HttpResponse, HttpRequest, HttpResponseBadRequest
from .models import Link
from django.template import loader
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth import login as django_login
from django.contrib.auth import logout as django_logout
from django.contrib.auth.models import User

def login(request:HttpRequest):
    """ Get login page
    
    :param request (HttpRequest): _description_
    :returns rendered login page
    """
    template = loader.get_template('login.html')
    return HttpResponse(template.render())
    
@login_required(login_url="login")
def portal(request:HttpRequest):
    """ Get portal page
    
    :param request (HttpRequest): _description_
    :returns rendered portal page
    """
    template = loader.get_template('portal.html')
    return HttpResponse(template.render())


class api:
    
    def login(request:HttpRequest):
        """ API login
    
        :param request (HttpRequest): _description_
        :returns Json response {'result':'OK'} if OK. Http Bad request if failed
        """
        if request.method != 'POST':
            return HttpResponseBadRequest()
        login_info = json.loads(request.body)
        print(f'type={type(login_info)}\nInfo={login_info}')
        user = authenticate(request, username=login_info['username'], password=login_info['password'])
        if user is not None:
            django_login(request, user)
            return JsonResponse({'result':'OK'})
        else:
            return HttpResponseBadRequest()
        

    @login_required(login_url="login")
    def logout(request):
        """ API logout
    
        :param request (HttpRequest): _description_
        :returns Json response {'result':'OK'} if OK. Http Bad request if failed
        """
        if request.method != 'POST':
            return HttpResponseBadRequest()
        django_logout(request)
        return JsonResponse({'result':'OK'})

    @login_required(login_url="login")
    def link(request:HttpRequest, link_id=None):
        """ API link

        :param request (HttpRequest): _description_
        :param link_id : get only specific link by id
        :returns Json response if OK. Http Bad request if failed
        """
        if request.method == 'GET':
            print(f'link_id={link_id}')
            total_count = Link.objects.count()
            if link_id is not None:
                links = list(Link.objects.filter(id=link_id).values())
            else:
                start = int(request.GET.get("start")) if request.GET.get("start") else 0
                count = int(request.GET.get("count")) if request.GET.get("count") else 1
                links = list(Link.objects.all()[start:start + count].values())
            # print(f'portals={links}')
            return JsonResponse({'total':total_count,
                                'count':len(links),
                                'links':links})
        elif request.method == 'POST':
            jsonLink = json.loads(request.body)
            print(f'Portal Json:{jsonLink}')
            link = Link(name=jsonLink['name'],
                          environment=jsonLink['environment'],
                          link=jsonLink['link'],
                          project=jsonLink['project'],
                          description=jsonLink['description'],
                          created_by=request.user.username,
                          updated_by=request.user.username
                          )
            link.save()
            return JsonResponse({'result': 'OK'})
        elif request.method == 'PUT':
            # Implement PUT method handling here #
            pass
        return HttpResponseBadRequest()
