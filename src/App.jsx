import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './widgets/Header';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import ReagentsTable from './pages/ReagentsTable';
import WeatherTable from './pages/WeatherTable';
import Settings from './pages/Settings';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/AuthContext';
import './styles/App.css';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/reagents" element={<PrivateRoute><ReagentsTable /></PrivateRoute>} />
                        <Route path="/weather" element={<PrivateRoute><WeatherTable /></PrivateRoute>} />
                        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                    </Routes>
                </main>
            </div>
        </AuthProvider>
    );
}

export default App;
