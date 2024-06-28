import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../styles/ReagentsTable.css';

function ReagentsTable() {
    const [reagents, setReagents] = useState([]);
    const tableApi = 'http://localhost:5000/api/reagents';

    useEffect(() => {
        fetchReagents();
    }, []);

    const fetchReagents = async () => {
        try {
            const response = await axios.get(tableApi);
            setReagents(response.data);
        } catch (error) {
            console.log('Error fetching reagents data:', error);
        }
    };

    return (
        <div className="table-container">
            <h2>Reagents List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {reagents.map(reagent => (
                        <tr key={reagent.id}>
                            <td>{reagent.id}</td>
                            <td>{reagent.name}</td>
                            <td>{reagent.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReagentsTable;