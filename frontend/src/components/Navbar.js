import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // Import useCart

function Navbar() {
    const { user, logout } = useAuth();
    const { totalItems } = useCart(); // Get total items from cart context
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    const navLinkStyles = ({ isActive }) => ({
        fontWeight: isActive ? 'bold' : 'normal',
        color: isActive ? '#2563eb' : '#1f2937',
        marginRight: '1rem',
        textDecoration: 'none',
        position: 'relative' // Needed for badge positioning
    });

    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-gray-800">
                    Automated Canteen
                </div>
                <div>
                    {user ? (
                        <div className="flex items-center">
                            {user.role === 'customer' && (
                                <NavLink to="/" style={navLinkStyles}>
                                    Order Food
                                    {/* Show cart item count badge */}
                                    {totalItems > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {totalItems}
                                        </span>
                                    )}
                                </NavLink>
                            )}
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
