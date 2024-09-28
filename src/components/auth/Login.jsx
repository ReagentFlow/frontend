import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from 'components/auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import 'styles/Auth.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
            if (error.response && error.response.data) {
                let errorMsg = '';
                if (error.response.status == 401) {
                    errorMsg = 'Неверный пароль или email'
                } else {
                    errorMsg = error.response.data.detail || 'Ошибка входа. Пожалуйста, попробуйте снова.';
                }
                setError(errorMsg);
            } else {
                setError('Неизвестная ошибка. Пожалуйста, попробуйте позже.');
            }
        }

        console.log('Email:', email);
        // console.log('Password:', password);
    };

    return (
        <div className='auth-page'>
            <div className="auth-container">
                <h2>Вход в ReagentFlow</h2>
                <p>Введите почту и пароль, чтобы войти</p>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                        <input
                            type="email"
                            placeholder="Электронная почта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <FontAwesomeIcon icon={faLock} className="input-icon" />
                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Продолжить</button>
                    {error && <div className="error-message">{error}</div>}
                </form>
                <div className='toggle-auth'>
                    <p>Нет аккаунта? <Link to="/register">Зарегистироваться</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;