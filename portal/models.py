# Create your models here.
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class Link(models.Model):
    name = models.CharField(max_length=255)
    environment = models.CharField(max_length=255)
    link = models.CharField(unique=True, blank=False, max_length=255)
    project = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    created_by = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_by = models.CharField(max_length=255)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return super().__str__()


class UserManager(BaseUserManager):

    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, password):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    pass
