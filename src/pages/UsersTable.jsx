import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import '../styles/Table.css';

function UsersTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsersData();
    }, []);

    const fetchUsersData = async () => {
        try {
            const response = await axiosInstance.get('auth/users/');
            setUsers(response.data);
            console.log('Users data:', response.data);
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
