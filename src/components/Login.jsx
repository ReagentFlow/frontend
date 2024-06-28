import React, { useState } from 'react';
import '../styles/Auth.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="auth-container">
            <h2>Вход в ReagentFlow</h2>
            <p>Введите почту и пароль, чтобы войти</p>
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
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Продолжить</button>
            </form>
        </div>
    );
}

export default Login;