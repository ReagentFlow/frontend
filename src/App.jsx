import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ReagentsTable from './components/ReagentsTable';
import WeatherTable from './components/WeatherTable';
import Settings from './components/Settings';
import './styles/App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reagents" element={<ReagentsTable />} />
                    <Route path="/weather" element={<WeatherTable />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
