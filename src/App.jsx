import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './widgets/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './pages/Home';
import ContainersTable from './pages/ContainersTable';
import ReagentsTable from './pages/ReagentsTable';
import UsersTable from './pages/UsersTable';
import Settings from './pages/Settings';
import PrivateRoute from './components/routes/PrivateRoute';
import AdminRoute from './components/routes/AdminRoute';
import RedirectRoute from './components/routes/RedirectRoute';
import { AuthProvider } from './components/auth/AuthContext';
import './styles/App.css';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                        <Route path="/login" element={<RedirectRoute><Login /></RedirectRoute>} />
                        <Route path="/register" element={<RedirectRoute><Register /></RedirectRoute>} />
                        <Route path="/reagents" element={<PrivateRoute><ReagentsTable /></PrivateRoute>} />
                        <Route path="/containers" element={<PrivateRoute><ContainersTable /></PrivateRoute>} />
                        <Route path="/users" element={<AdminRoute><UsersTable /></AdminRoute>} />
                        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                    </Routes>
                </main>
            </div>
        </AuthProvider>
    );
}

export default App;
