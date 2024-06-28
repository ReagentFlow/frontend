import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ReagentsTable.css';

function ReagentsTable() {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d8115337380246f595b5dd898b5ed843`
            );
            const transformedData = [
                {
                    id: response.data.id,
                    name: response.data.name,
                    temperature: response.data.main.temp,
                    weather: response.data.weather[0].description,
                },
            ];
            setWeatherData(transformedData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div className="table-container">
            <h2>Weather Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>City</th>
                        <th>Temperature</th>
                        <th>Weather</th>
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