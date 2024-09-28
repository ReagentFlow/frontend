import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from 'components/auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faIdBadge } from '@fortawesome/free-solid-svg-icons';
import 'styles/Auth.css';

function Register() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [inviteCode, setInviteCode] = useState('');
    const [error, setErrors] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors('');
        try {
            await register(email, firstName, middleName, lastName, password, rePassword, inviteCode);
            navigate('/login');
        }
        catch (error) {
            console.error('Registration failed', error);
            if (error.response && error.response.data) {
                const data = error.response.data;
                // Извлечение всех сообщений об ошибках из объекта
                const errorMessages = Object.values(data).flat();
                setErrors(errorMessages);
            } else {
                setErrors(['Неизвестная ошибка. Пожалуйста, попробуйте позже.']);
            }
        }

        console.log('email:', email);
        console.log('firstName:', firstName);
        console.log('middleName:', middleName);
        console.log('lastName:', lastName);
        // console.log('password:', password);
        // console.log('rePassword:', rePassword);
        console.log('inviteCode:', inviteCode);
    };

    return (
        <div className='auth-page'>
            <div className="auth-container">
                <h2>Регистрация в ReagentFlow</h2>
                <p>Заполните поля, чтобы зарегистрироваться</p>
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
                        <FontAwesomeIcon icon={faUser} className="input-icon" />
                        <input
                            type="text"
                            placeholder="Фамилия"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <FontAwesomeIcon icon={faUser} className="input-icon" />
                        <input
                            type="text"
                            placeholder="Имя"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <FontAwesomeIcon icon={faUser} className="input-icon" />
                        <input
                            type="text"
                            placeholder="Отчество"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
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
                    <div className="input-group">
                        <FontAwesomeIcon icon={faLock} className="input-icon" />
                        <input
                            type="password"
                            placeholder="Повторите пароль"
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <FontAwesomeIcon icon={faIdBadge} className="input-icon" />
                        <input
                            type="text"
                            placeholder="Код приглашения"
                            value={inviteCode}
                            onChange={(e) => setInviteCode(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Зарегистрироваться</button>
                    {error && <div className="error-message">{error}</div>}
                </form>
                <div className="toggle-auth">
                    <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;
