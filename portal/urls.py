from django.urls import path
from . import views

urlpatterns = [
    path('', views.portal, name='portal'),
    path('login/', views.login, name='login'),
    path('api/v1.0/login', views.api.login, name='api.login'),
    path('api/v1.0/logout', views.api.logout, name='api.logout'),
    path('api/v1.0/link', views.api.link, name='api.link'),
    path('api/v1.0/link/<int:link_id>', views.api.link, name='api.link'),
    path('api/v1.0/user', views.api.get_user, name='api.user'),
]
