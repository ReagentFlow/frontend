import requests
import random

# URL для отправки POST-запросов
url = "http://localhost:8000/data/containers/"
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIwMDA3NDQyLCJpYXQiOjE3MjAwMDU2NDIsImp0aSI6IjRjZWIxNjhkZjAyODQwOTU5OTFmM2Q2OGQ4NGFhMjQ2IiwidXNlcl9pZCI6MX0.j5yao3UNbo-wBlX3TS3Q6J5_Ggg_rHQzikYbmyGz-sQ'

# Заголовок с авторизацией
headers = {
    "Authorization": f'Bearer {token}',
    "Content-Type": "application/json"
}

# Функция для генерации случайных данных контейнера
def generate_container_data(container_id):
    return {
        "id": container_id,
        "container_id": random.randint(100, 200),
        "name": f"Контейнер {container_id}",
        "formula": "H2O",
        "mass": round(random.uniform(1000.0, 2000.0), 2),
        "volume": round(random.uniform(500.0, 1500.0), 2),
        "density": round(random.uniform(1.0, 10.0), 2),
        "location": f"Место {container_id}",
        "precursor": f"{random.choice([True, False])}",
        "cas": f"123-{random.randint(1000, 9999)}-12",
        "qualification": random.randint(1, 100)
    }

# Отправка данных для 50 контейнеров
for container_id in range(1, 51):
    data = generate_container_data(container_id)
    response = requests.post(url, headers=headers, json=data)
    
    # Проверка ответа
    if response.status_code == 201:
        print(f"Контейнер {container_id} успешно отправлен!")
    else:
        print(f"Ошибка при отправке контейнера {container_id}: {response.status_code} - {response.text}")
