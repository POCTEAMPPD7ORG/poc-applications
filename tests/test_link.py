from django.test import TestCase
from django.contrib.auth.models import User
from portal.models import Link


class LinkTestCase(TestCase):
    def setUp(self):
        """Prepare the login user."""
        user = User.objects.create_user(
            username='loan',
            password='adminpoc2023',
            is_active=True,
        )
        user.save()
        responseLogin = self.client.post(
            'http://127.0.0.1:8000/api/v1.0/login',
            {"username": "loan", "password": "adminpoc2023"},
            content_type="application/json"
        )
        self.assertEqual(responseLogin.status_code, 200)

    def test_add_row(self):
        """Test add row."""
        # Given
        jsonLink = {
            'name': 'New Name',
            'environment': 'New Environment',
            'link': 'New Link',
            'project': 'New Project',
            'description': 'New Description'
        }

        print(' >> Input new row: ', jsonLink)
        self.assertEqual(Link.objects.count(), 0)

        # When
        response = self.client.post(
            'http://127.0.0.1:8000/api/v1.0/link',
            jsonLink,
            content_type="application/json"
        )

        # Then
        print(' >> Result of adding new row: ', response)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Link.objects.count(), 1)
        newLink: Link = Link.objects.all()[0]
        self.assertEqual(newLink.name, 'New Name')
        self.assertEqual(newLink.environment, 'New Environment')
        self.assertEqual(newLink.link, 'New Link')
        self.assertEqual(newLink.project, 'New Project')
        self.assertEqual(newLink.description, 'New Description')
        #
