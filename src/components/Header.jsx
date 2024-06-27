import React from 'react';
import './Header.css';
import logo from '../assets/logo.png';
import settingsIcon from '../assets/settings.png';

function Header() {
    return (
        <div className="header">
            <div className="logo-section">
                <img src={logo} className="logo" alt="logo" />
                <div className="logo-text">ReagentFlow</div>
            </div>
            <img src={settingsIcon} className="settings-button" alt="settings" />
        </div>
    );
}

export default Header;
