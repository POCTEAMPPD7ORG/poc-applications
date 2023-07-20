import json


from django.http import JsonResponse, HttpResponse, HttpRequest, HttpResponseBadRequest
from django.db.models import Q

from .models import Link
from django.template import loader
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate
from django.contrib.auth import login as django_login
from django.contrib.auth import logout as django_logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user as django_get_user
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse, HttpRequest, HttpResponseBadRequest
from django.template import loader
from django.views.decorators.csrf import csrf_exempt

def login(request: HttpRequest):
    """ Get login page
    
    :param request (HttpRequest): _description_
    :returns rendered login page
    """
    template = loader.get_template('login.html')
    return HttpResponse(template.render())


@login_required(login_url="login")
def portal(request: HttpRequest):
    """ Get portal page
    
    :param request (HttpRequest): _description_
    :returns rendered portal page
    """
    template = loader.get_template('portal.html')
    return HttpResponse(template.render())


class api:

    @csrf_exempt
    def login(request: HttpRequest):
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
            return JsonResponse({'result': 'OK'})
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
        return JsonResponse({'result': 'OK'})

    @login_required(login_url="login")
    def link(request: HttpRequest, link_id=None):
        """ API link

        :param request (HttpRequest): _description_
        :param link_id : get only specific link by id
        :returns Json response if OK. Http Bad request if failed
        Can search by name, environment, link, project, description, created_by
        """
        start = None
        count = None
        if request.method == 'GET':
            print(f'link_id={link_id}')
            total_count = Link.objects.count()
            if link_id is not None:
                links = list(Link.objects.filter(id=link_id).values())
            else:
                start = int(request.GET.get("start")) if request.GET.get("start") else 0
                count = int(request.GET.get("count")) if request.GET.get("count") else 1
                links = list(Link.objects.all()[start:start + count].values())
            # ========================== Search ========================== #
            if request.GET.get("search"):
                query = request.GET.get("search")
                links = list(Link.objects.filter(Q(name__icontains=query)
                                                 | Q(environment__icontains=query)
                                                 | Q(link__icontains=query)
                                                 | Q(project__icontains=query)
                                                 | Q(description__icontains=query)
                                                 | Q(created_by__icontains=query))[start:start + count].values())
                total_count = Link.objects.filter(Q(name__icontains=query)
                                                 | Q(environment__icontains=query)
                                                 | Q(link__icontains=query)
                                                 | Q(project__icontains=query)
                                                 | Q(description__icontains=query)
                                                 | Q(created_by__icontains=query)).count()
            return JsonResponse({'total': total_count,
                                 'count': len(links),
                                 'links': links})
            
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
            jsonLink = json.loads(request.body)
            print(f'Portal Json ORG:{jsonLink}')
            link_put = Link.objects.filter(id=jsonLink['id'])
            print(f'Portal Json EDIT:{link_put}')
            jsonLink['updated_by'] = request.user.username
            link_put.update(**jsonLink)
            return JsonResponse({'result': 'OK'})       
        
        elif request.method == 'DELETE':
            try:
                link = Link.objects.get(pk=link_id)
                json_link = json.loads(request.body)
                print(f'Portal Json: {json_link}')
                link.delete()
                # Link.objects.all().update(id=F('id'))
                return JsonResponse({'message': 'Link deleted successfully.'})
            except Link.DoesNotExist:
                return JsonResponse({'error': 'Link not found.'}, status=404)
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=500)
        
        return HttpResponseBadRequest()

    @login_required(login_url="login")
    def get_user(request: HttpRequest):
        if request.method != 'GET':
            return HttpResponseBadRequest
        user = django_get_user(request)
        return JsonResponse({'username': user.get_username(),
                            'email': user.email,
                             'first_name': user.first_name,
                             'last_name': user.last_name
                             })
