import requests
from string import ascii_letters
from random import randint, choice, uniform
from login import login_superuser
from constants import API_URL, REAGENT_NAMES, REAGENTS

ACCESS_TOKEN = login_superuser()

HEADERS = {
    'Authorization': f'Bearer {ACCESS_TOKEN}',
    'Content-Type': 'application/json',
}


def generate_container_data(container_id):
    return {
        'container_id': container_id,
        'name': choice(REAGENT_NAMES),
        'formula': '',
        'mass': round(uniform(1000.0, 2000.0), 2),
        'volume': 1,
        'density': round(uniform(1.0, 10.0), 2),
        'location': f'Шкаф №{randint(1, 10)}',
        'precursor': '',
        'cas': '',
        'qualification': randint(10, 100),
    }


if __name__ == '__main__':
    url = f'{API_URL}data/containers/'

    for i in range(500):
        data = generate_container_data(container_id=i)
        data['cas'] = REAGENTS[data['name']]['cas']
        data['formula'] = REAGENTS[data['name']]['formula']
        data['precursor'] = REAGENTS[data['name']]['precursor']
        response = requests.post(url, headers=HEADERS, json=data)
        
        if response.status_code == 201:
            print(f'Контейнер {data["name"]} успешно создан')
        else:
            print(f'Ошибка при создании контейнера {data["name"]}: {response.status_code} - {response.text}')
