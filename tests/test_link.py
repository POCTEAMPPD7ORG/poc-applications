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
            'link': 'http://newlink.com',
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
        self.assertEqual(newLink.link, 'http://newlink.com')
        self.assertEqual(newLink.project, 'New Project')
        self.assertEqual(newLink.description, 'New Description')
        #

    def test_edit_row(self):
        """Test edit row."""
        # Prepare data
        link = Link(id='1',
                    name='Current Name',
                    environment='Environment',
                    link='http://curlink.com',
                    project='Project',
                    description='Description',
                    created_by='triet',
                    updated_by='tri'
                    )
        link.save()
        self.assertEqual(Link.objects.count(), 1)

        # When
        jsonLink = {
            'name': 'Updated Name',
            'environment': 'Updated Environment',
            'link': 'http://updatedlink.com',
            'project': 'Updated Project',
            'description': 'Updated Description'
        }

        response = self.client.put('http://127.0.0.1:8000/api/v1.0/link/{}'.format(link.id),
                                   jsonLink,
                                   content_type="application/json"
                                   )

        # Then
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Link.objects.count(), 1)
        updatedLink: Link = Link.objects.get(id=link.id)
        self.assertEqual(updatedLink.name, jsonLink['name'])
        self.assertEqual(updatedLink.environment, jsonLink['environment'])
        self.assertEqual(updatedLink.link, jsonLink['link'])
        self.assertEqual(updatedLink.project, jsonLink['project'])
        self.assertEqual(updatedLink.description, jsonLink['description'])
        self.assertEqual(updatedLink.updated_by, 'loan')

    def test_delete_row(self):
        """Test Delete row."""
        # Prepare data
        link = Link(name='Name to delete',
                    environment='Environment to delete',
                    link='http://deletelink.com',
                    project='Project to delete',
                    description='Description to delete',
                    created_by='triet',
                    updated_by='tri'
                    )
        link.save()

        # When
        self.assertEqual(Link.objects.count(), 1)
        response = self.client.delete('http://127.0.0.1:8000/api/v1.0/link/{}'.format(link.id))

        # Then
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Link.objects.count(), 0)
