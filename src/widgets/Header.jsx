import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/logo.png';
import settingsIcon from '../assets/settings.png';
import { AuthContext } from '../components/AuthContext';

function Header() {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="header">
            <div className="left-section">
                <img src={logo} className="logo" alt="logo" />
                <div className="logo-text">ReagentFlow</div>
            </div>
            <div className="nav-buttons">
                {user ? (
                    <>
                        <Link to="/" className="nav-link">Главная</Link>
                        <Link to="/reagents" className="nav-link">Реагенты</Link>
                        <Link to="/settings" className="nav-link">Настройки</Link>
                        <button onClick={logout} className="nav-link">Выйти</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Войти</Link>
                        <Link to="/register" className="nav-link">Регистрация</Link>
                    </>
                )}
            </div>
            {user && (
                <div className='right-section'>
                    <Link to="/settings" className="settings-button">
                        <img src={settingsIcon} alt="settings" />
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Header;
