import React, { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import '../styles/Settings.css';

function Settings() {
    const { logout } = useContext(AuthContext);

    return (
        <div className="settings-container">
            <div className="settings-banner">
                <h1>Настройки</h1>
                <button onClick={logout} className="logout-button">Выйти</button>
            </div>
        </div>
    );
}

export default Settings;
