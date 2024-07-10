import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/auth/AuthContext';
import axios from 'axios';
import API_URL from '../constants/constants';
import '../styles/Settings.css';
import copyIcon from '../assets/copy-icon.png';

function Settings() {
    const { logout } = useContext(AuthContext);

    const [user, setUser] = useState({
        fullName: '',
        birthDate: '',
        phone: '',
        email: '',
        role: '',
    });
    const [inviteCodes, setInviteCodes] = useState([]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${API_URL}auth/users/me/`);
            const roleMap = {
                'admin': 'Администратор',
                'user': 'Пользователь',
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

    const fetchInviteCodes = async () => {
        try {
            const response = await axios.get(`${API_URL}auth/invite_codes/`);
            console.log('Invite codes:', response.data);
            setInviteCodes(response.data.invite_codes);
        } catch (error) {
            console.error('Error fetching invite codes', error);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchInviteCodes();
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

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        console.log('Copied to clipboard:', code);
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
            <div className='invite-codes-container'>
                <h3>Пригласительные коды</h3>
                <div className='invite-codes'>
                    {inviteCodes.map((invite) => (
                        <div key={invite.id} className="invite-code">
                            <div className="invite-info">
                                <span>{invite.role === 'admin' ? 'Администратор' : 'Пользователь'}</span>
                                <span>{invite.code}</span>
                            </div>
                            <button onClick={() => copyToClipboard(invite.code)} className="copy-button">
                                <img src={copyIcon} alt="Copy" />
                            </button>
                        </div>
                    ))}
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
