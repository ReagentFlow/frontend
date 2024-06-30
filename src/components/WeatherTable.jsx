import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ReagentsTable.css';

const cities = [
    'London,uk', 'Novosibirsk, ru', 'New York,us', 'Tokyo,jp', 'Paris,fr', 'Berlin,de',
    'Moscow,ru', 'Sydney,au', 'Beijing,cn', 'Mumbai,in', 'Cape Town,za',
    'São Paulo,br', 'Cairo,eg', 'Dubai,ae', 'Istanbul,tr', 'Mexico City,mx',
    'Toronto,ca', 'Los Angeles,us', 'Chicago,us', 'Houston,us', 'Phoenix,us',
    'Philadelphia,us', 'San Antonio,us', 'San Diego,us', 'Dallas,us', 'San Jose,us',
    'Austin,us', 'Jacksonville,us', 'Fort Worth,us', 'Columbus,us', 'Charlotte,us',
    'San Francisco,us', 'Indianapolis,us', 'Seattle,us', 'Denver,us', 'Washington,us',
    'Boston,us', 'El Paso,us', 'Nashville,us', 'Detroit,us', 'Oklahoma City,us',
    'Portland,us', 'Las Vegas,us', 'Memphis,us', 'Louisville,us', 'Baltimore,us',
    'Milwaukee,us', 'Albuquerque,us', 'Tucson,us', 'Fresno,us', 'Sacramento,us',
    'Kansas City,us', 'Mesa,us', 'Atlanta,us', 'Omaha,us', 'Colorado Springs,us',
    'Raleigh,us', 'Miami,us', 'Virginia Beach,us', 'Oakland,us', 'Minneapolis,us',
    'Tulsa,us', 'Arlington,us', 'New Orleans,us', 'Wichita,us', 'Cleveland,us',
];

function ReagentsTable() {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        try {
            const promises = cities.map(city =>
                axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=d8115337380246f595b5dd898b5ed843`)
            );
            const responses = await Promise.all(promises);
            const transformedData = responses.map(response => ({
                id: response.data.id,
                name: response.data.name,
                temperature: (response.data.main.temp - 273.15).toFixed(2),
                weather: response.data.weather[0].description,
            }));

            setWeatherData(transformedData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div className="table-container">
            <h2>Данные о погоде</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Город</th>
                        <th>Температура</th>
                        <th>Погода</th>
                    </tr>
                </thead>
                <tbody>
                    {weatherData.map((data) => (
                        <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.temperature}</td>
                            <td>{data.weather}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReagentsTable;