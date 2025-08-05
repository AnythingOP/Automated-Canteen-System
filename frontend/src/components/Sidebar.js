import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { user } = useAuth();

    const navLinkStyles = ({ isActive }) => {
        return {
            backgroundColor: isActive ? '#3B82F6' : 'transparent',
            color: isActive ? 'white' : '#4B5563',
        };
    };

    return (
        <div className="w-64 bg-white shadow-md flex-shrink-0">
            <div className="p-6 text-2xl font-bold text-gray-800 border-b">
                Canteen
            </div>
            <nav className="p-4">
                {user?.role === 'customer' && (
                    <>
                        <NavLink to="/" style={navLinkStyles} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white font-semibold">Menu</NavLink>
                        {/* "My Cart" link has been removed */}
                        <NavLink to="/history" style={navLinkStyles} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white font-semibold">Order History</NavLink>
                    </>
                )}
                {user?.role === 'kitchen' && (
                    <NavLink to="/kitchen" style={navLinkStyles} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white font-semibold">Kitchen Dashboard</NavLink>
                )}
                {!user && (
                    <NavLink to="/" style={navLinkStyles} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white font-semibold">Menu</NavLink>
                )}
                <NavLink to="/track" style={navLinkStyles} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white font-semibold">Track Order</NavLink>
                <NavLink to="/about" style={navLinkStyles} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white font-semibold">About Us</NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;