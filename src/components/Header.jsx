import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/logo.png';
import settingsIcon from '../assets/settings.png';

function Header() {
    return (
        <div className="header">
            <div className="left-section">
                <img src={logo} className="logo" alt="logo" />
                <div className="logo-text">ReagentFlow</div>
            </div>
            <div className="nav-buttons">
                <Link to="/" className="nav-link">Главная</Link>
                <Link to="/reagents" className="nav-link">Реагенты</Link>
            </div>
            <div className='right-section'>
                <Link to="/settings" className="settings-button">
                    <img src={settingsIcon} alt="settings" />
                </Link>
            </div>
        </div>
    );
}

export default Header;