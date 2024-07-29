import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from 'constants/constants';
import 'styles/Table.css';

function UsersTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsersData();
    }, []);

    const fetchUsersData = async () => {
        try {
            const response = await axios.get(`${API_URL}auth/users/`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users data:', error);
        }
    };

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Роль</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.last_name}</td>
                            <td>{user.first_name}</td>
                            <td>{user.middle_name}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersTable;
