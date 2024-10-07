import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from 'constants/constants';
import 'styles/Table.css';

function ReagentsTable() {
    const [reagents, setReagents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredContainers = reagents.filter(reagent =>
        reagent.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="table-container">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Поиск по названию..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Формула</th>
                        <th>Масса, г</th>
                        <th>Объем, мл</th>
                        <th>Квалификация</th>
                        <th>Прекурсор</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContainers.map((reagent) => (
                        <tr key={reagent.id}>
                            <td>{reagent.name}</td>
                            <td>{reagent.formula}</td>
                            <td>
                                {reagent.mass}
                                {reagent.mass < 20 && <span className="low-mass-indicator"> &#9888;</span>}
                            </td>
                            <td>{(reagent.mass / reagent.density).toFixed(3)}</td>
                            <td>{reagent.qualification}</td>
                            <td>{precursorMap[reagent.precursor]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReagentsTable;
