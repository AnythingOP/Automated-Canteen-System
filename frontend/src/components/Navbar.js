import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { totalItems } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-sm h-16 flex justify-end items-center px-6">
            <div className="flex items-center">
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
                        <span className="font-semibold mr-4">Welcome, {user.username}</span>
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