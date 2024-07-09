import requests
from string import ascii_letters
from random import randint, choice, uniform
from login import login_superuser
from constants import API_URL, REAGENT_NAMES

ACCESS_TOKEN = login_superuser()

HEADERS = {
    'Authorization': f'Bearer {ACCESS_TOKEN}',
    'Content-Type': 'application/json',
}


def generate_fomula(length: int):
        letters = ascii_letters
        return ''.join(choice(letters) for _ in range(length)).lower()


def generate_container_data():
    return {
        'container_id': randint(1, 500),
        'name': choice(REAGENT_NAMES),
        'formula': generate_fomula(randint(5, 10)),
        'mass': round(uniform(1000.0, 2000.0), 2),
        'volume': round(uniform(500.0, 1500.0), 2),
        'density': round(uniform(1.0, 10.0), 2),
        'location': f'Шкаф №{randint(1, 10)}',
        'precursor': choice(['true', 'false']),
        'cas': f'{randint(1000, 9999)}-{randint(1000, 9999)}-{randint(1000, 9999)}',
        'qualification': choice(['1', '2', '3', '4', '5']),
    }


if __name__ == '__main__':
    url = f'{API_URL}data/containers/'

    for _ in range(100):
        data = generate_container_data()
        response = requests.post(url, headers=HEADERS, json=data)
        
        if response.status_code == 201:
            print(f'Контейнер {data["name"]} успешно создан')
        else:
            print(f'Ошибка при создании контейнера {data["name"]}: {response.status_code} - {response.text}')
