import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/auth/AuthContext';
import axios from 'axios';
import API_URL from '../constants/constants';
import '../styles/Settings.css';

function Settings() {
    const { logout } = useContext(AuthContext);

    const [user, setUser] = useState({
        fullName: '',
        birthDate: '',
        phone: '',
        email: '',
        role: '',
    });

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${API_URL}auth/users/me/`);
            const roleMap = {
                'admin': 'Администратор',
                'user': 'Пользователь',
                'User': 'Пользователь',
            };
            setUser({
                fullName: `${response.data.last_name} ${response.data.first_name} ${response.data.middle_name}`,
                birthDate: response.data.birth_date || '01.01.1970',
                phone: response.data.phone || '8-800-555-35-35',
                email: response.data.email,
                role: roleMap[response.data.role] || response.data.role,
            });
        } catch (error) {
            console.error('Error fetching user data', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleLogout = () => {
        logout();
        console.log('User logged out');
    };

    const handleChangePassword = () => {
        // pass
        console.log('Change password');
    };

    const handleChangeEmail = () => {
        // pass
        console.log('Change email');
    };

    return (
        <div className="settings-page">
            <h2>Управление профилем</h2>
            <div className="profile-section">
                <div className="profile-picture">
                    <div className="placeholder"></div>
                </div>
                <div className="profile-info">
                    <h3>{user.fullName}</h3>
                </div>
            </div>
            <div className="personal-data-section">
                <h3>Личные данные</h3>
                <div className="personal-data">
                    <p><strong>Дата рождения:</strong> {user.birthDate}</p>
                    <p><strong>Телефон:</strong> {user.phone}</p>
                    <p><strong>Электронная почта:</strong> {user.email}</p>
                    <p><strong>Роль:</strong> {user.role}</p>
                </div>
            </div>
            <div className="button-container">
                <div className="action-buttons">
                    <button onClick={handleChangePassword}>Изменить пароль</button>
                    <button onClick={handleChangeEmail}>Изменить почту</button>
                    <button onClick={handleLogout} className="logout-button">Выйти</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;
