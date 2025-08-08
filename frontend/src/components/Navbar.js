import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// The component now receives a function to toggle the sidebar
const Navbar = ({ onMenuButtonClick }) => {
    const { user, logout } = useAuth();
    const { totalItems } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    // Don't show the hamburger button on these pages
    const noMenuButtonRoutes = ['/login', '/register', '/kitchen'];
    const showMenuButton = !noMenuButtonRoutes.includes(location.pathname);

    return (
        <header className="bg-white shadow-sm h-16 flex justify-between items-center px-4 sm:px-6 flex-shrink-0">
            {/* Hamburger Menu Button for mobile */}
            {showMenuButton && (
                <button onClick={onMenuButtonClick} className="md:hidden text-gray-600 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            )}

            {/* This div ensures the user info is always on the right */}
            <div className="flex items-center ml-auto">
                {user ? (
                    <>
                        {user.role === 'customer' && (
                            <Link to="/cart" className="relative mr-5 text-gray-600 hover:text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        )}
                        <span className="font-semibold mr-4 hidden sm:inline">Welcome, {user.username}</span>
                        <button onClick={handleLogout} className="font-semibold text-red-600 hover:text-red-800">Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-800">Login</Link>
                )}
            </div>
        </header>
    );
};

export default Navbar;