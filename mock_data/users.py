import requests
from string import ascii_letters
from random import randint, choice
from login import login_superuser
from constants import API_URL, FIRST_NAME, MIDDLE_NAME, LAST_NAME

ACCESS_TOKEN = login_superuser()

HEADERS = {
    'Authorization': f'Bearer {ACCESS_TOKEN}',
    'Content-Type': 'application/json',
}


def generate_user_data():
    return {
        'first_name': choice(FIRST_NAME),
        'middle_name': choice(MIDDLE_NAME),
        'last_name': choice(LAST_NAME),
        'email': '',
        'password': f'some_password_somedfhj_{randint(1000, 9999)}+_!!!#',
        'invite_code': '',
    }


def generate_email(length: int):
        letters = ascii_letters
        return ''.join(choice(letters) for _ in range(length))


def get_all_invite_codes():
    url = f'{API_URL}auth/invite_codes/'
    response = requests.get(url, headers=HEADERS)

    if response.status_code == 200:
        return response.json()
    else:
        print(f'Ошибка при получении списка пригласительных кодов: {response.status_code} - {response.text}')
        return []
    

def create_invite_code(role: int):
    role_map = {
        1: 'admin',
        2: 'user',
    }
    data = {
        'role': role_map[role],
    }
    url = f'{API_URL}auth/invite_codes/'
    requests.post(url, headers=HEADERS, json=data)


def create_user():
    url = f'{API_URL}auth/users/'
    data = generate_user_data()
    data['invite_code'] = get_all_invite_codes()['invite_codes'][randint(0,1)]['code']
    print(data['invite_code'])
    data['email'] = f'{generate_email(10)}@example.com'

    response = requests.post(url, headers=HEADERS, json=data)

    if response.status_code == 201:
        print(f'Пользователь {data['first_name']} {data['last_name']} успешно создан!')
    else:
        print(f'Ошибка при создании пользователя {data['first_name']} {data['last_name']}: {response.status_code} - {response.text}')


if __name__ == '__main__':
    create_invite_code(1)
    create_invite_code(2)
    for _ in range(100):
        create_user()