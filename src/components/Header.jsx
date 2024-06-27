import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
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
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/reagents" className="nav-link">Reagents</Link>
            </div>
            <Link to="/settings" className="settings-button">
                <img src={settingsIcon} alt="settings" />
            </Link>
        </div>
    );
}

export default Header;
