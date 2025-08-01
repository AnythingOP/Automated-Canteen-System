import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    // Simple NavLink styling
    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? 'bold' : 'normal',
            color: isActive ? '#2563eb' : '#1f2937',
            marginRight: '1rem',
            textDecoration: 'none'
        };
    };

    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-gray-800">
                    Automated Canteen
                </div>
                <div>
                    {user ? (
                        <div className="flex items-center">
                            {user.role === 'customer' && <NavLink to="/" style={navLinkStyles}>Order Food</NavLink>}
                            {user.role === 'kitchen' && <NavLink to="/kitchen" style={navLinkStyles}>Kitchen Dashboard</NavLink>}
                            <NavLink to="/track" style={navLinkStyles}>Track Order</NavLink>
                            <span className="text-gray-600 mr-4">| Welcome, {user.username}</span>
                            <button onClick={handleLogout} className="font-semibold text-red-600 hover:text-red-800">Logout</button>
                        </div>
                    ) : (
                        <>
                            <NavLink to="/login" style={navLinkStyles}>Login</NavLink>
                            <NavLink to="/register" style={navLinkStyles}>Register</NavLink>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;