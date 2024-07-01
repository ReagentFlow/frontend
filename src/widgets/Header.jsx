import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/logo.png';
import settingsIcon from '../assets/settings.png';
import { AuthContext } from '../components/AuthContext';

function Header() {
    const { user } = useContext(AuthContext);

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
                        <Link to="/weather" className="nav-link">Реагенты</Link>
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
