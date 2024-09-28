import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from 'constants/constants';
import 'styles/Table.css';

function ReagentsTable() {
    const [reagents, setReagents] = useState([]);

    useEffect(() => {
        fetchReagentsData();
    }, []);

    const fetchReagentsData = async () => {
        try {
            const response = await axios.get(`${API_URL}data/reagents/`);
            setReagents(response.data);
        } catch (error) {
            console.error('Error fetching reagents data:', error);
        }
    };

    const precursorMap = {
        true: 'Да',
        false: 'Нет'
    }

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Формула</th>
                        <th>Масса, г</th>
                        <th>Объем, мл</th>
                        <th>Прекурсор</th>
                    </tr>
                </thead>
                <tbody>
                    {reagents.map((reagent) => (
                        <tr key={reagent.id}>
                            <td>{reagent.name}</td>
                            <td>{reagent.formula}</td>
                            <td>{reagent.mass}</td>
                            <td>{reagent.volume}</td>
                            <td>{precursorMap[reagent.precursor]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReagentsTable;
