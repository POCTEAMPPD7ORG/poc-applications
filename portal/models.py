# Create your models here.
from django.db import models


class Portal(models.Model):
    name = models.CharField(max_length=255)
    environment = models.CharField(max_length=255)
    link = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    note = models.CharField(max_length=255)
    created_by = models.CharField(max_length=255)
    created_at = models.DateTimeField(max_length=255)
    updated_by = models.CharField(max_length=255)
    updated_at = models.DateTimeField(max_length=255)
