import React, { useState } from 'react';
import '../styles/Auth.css';

function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div className="auth-container">
            <h2>Регистрация в ReagentFlow</h2>
            <p>Заполните поля, чтобы зарегистрироваться</p>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="input-group">
                    <input
                        type="email"
                        placeholder="Электронная почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Имя пользователя"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Зарегистрироваться</button>
            </form>
        </div>
    );
}

export default Register;
