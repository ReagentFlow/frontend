import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import API_URL from '../constants/constants';
import { AuthContext } from '../components/auth/AuthContext';
import '../styles/Table.css';

function UsersTable() {
    const { authTokens } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsersData();
    }, [authTokens]);

    const fetchUsersData = async () => {
        if (!authTokens) {
            return;
        }
        try {
            const response = await axios.get(`${API_URL}auth/users/`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });
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
