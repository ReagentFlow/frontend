import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import '../styles/Table.css';

function ReagentsTable() {
    const [reagents, setReagents] = useState([]);

    useEffect(() => {
        fetchReagentsData();
    }, []);

    const fetchReagentsData = async () => {
        try {
            const response = await axiosInstance.get('data/reagents/');
            setReagents(response.data);
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
                        <th>Название</th>
                        <th>Формула</th>
                        <th>Масса</th>
                        <th>Объем</th>
                        <th>Прекурсор</th>
                    </tr>
                </thead>
                <tbody>
                    {reagents.map((reagent) => (
                        <tr key={reagent.id}>
                            <td>{reagent.id}</td>
                            <td>{reagent.name}</td>
                            <td>{reagent.formula}</td>
                            <td>{reagent.mass}</td>
                            <td>{reagent.volume}</td>
                            <td>{reagent.precursor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReagentsTable;
