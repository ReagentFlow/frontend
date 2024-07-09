import requests
from constants import API_URL

def login_superuser():
    url = f'{API_URL}auth/token/'
    data = {
        'email': 'root@root.com',
        'password': 'root',
    }
    response = requests.post(url, json=data)
    return response.json()['access']

