import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import 'styles/Header.css';
import logo from 'assets/logo.png';
import settingsIcon from 'assets/settings.png';
import { AuthContext } from 'components/auth/AuthContext';

function Header() {
    const { user, role } = useContext(AuthContext);

    return (
        <div className="header">
            <div className="left-section">
                <img src={logo} className="logo" alt="logo" />
                <div className="logo-text">ReagentFlow</div>
            </div>
            {user && (
                <>
                    <div className="nav-buttons">
                        {/* <Link to="/" className="nav-link">Главная</Link> */}
                        <Link to="/containers" className="nav-link">Контейнеры</Link>
                        <Link to="/reagents" className="nav-link">Реагенты</Link>
                        {role === 'admin' && (
                            <Link to="/users" className="nav-link">Пользователи</Link>
                        )}
                    </div>
                    <div className='right-section'>
                        <Link to="/settings" className="settings-button">
                            <img src={settingsIcon} alt="settings" />
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default Header;
