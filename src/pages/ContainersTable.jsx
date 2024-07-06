import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import '../styles/Table.css';

function ContainersTable() {
    const [containers, setContainers] = useState([]);

    useEffect(() => {
        fetchContainersData();
    }, []);

    const fetchContainersData = async () => {
        try {
            const response = await axiosInstance.get('data/containers/');
            setContainers(response.data);
        } catch (error) {
            console.error('Error fetching reagents data:', error);
        }
    };

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID Контейнера</th>
                        <th>Название</th>
                        <th>Формула</th>
                        <th>Масса</th>
                        <th>Объем</th>
                        <th>Прекурсор</th>
                        <th>Местоположение</th>
                    </tr>
                </thead>
                <tbody>
                    {containers.map((container) => (
                        <tr key={container.id}>
                            <td>{container.id}</td>
                            <td>{container.container_id}</td>
                            <td>{container.name}</td>
                            <td>{container.formula}</td>
                            <td>{container.mass}</td>
                            <td>{container.volume}</td>
                            <td>{container.precursor}</td>
                            <td>{container.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ContainersTable;
