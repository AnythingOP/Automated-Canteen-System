import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// The component now receives props to handle its mobile state
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const { user } = useAuth();

    const navLinkStyles = ({ isActive }) => {
        return {
            backgroundColor: isActive ? '#3B82F6' : 'transparent',
            color: isActive ? 'white' : '#4B5563',
        };
    };

    // When a link is clicked on mobile, close the sidebar
    const handleLinkClick = () => {
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    };

    return (
        // Use responsive classes to show/hide and position the sidebar
        <div className={`fixed inset-y-0 left-0 bg-white shadow-md w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-40`}>
            <div className="p-6 text-2xl font-bold text-gray-800 border-b">
                Canteen
            </div>
            <nav className="p-4">
                {user?.role === 'customer' && (
                    <>
                        <NavLink to="/" style={navLinkStyles} onClick={handleLinkClick} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white font-semibold">Menu</NavLink>
                        <NavLink to="/history" style={navLinkStyles} onClick={handleLinkClick} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white font-semibold">Order History</NavLink>
                    </>
                )}
                {user?.role === 'kitchen' && (
                    <NavLink to="/kitchen" style={navLinkStyles} onClick={handleLinkClick} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white font-semibold">Kitchen Dashboard</NavLink>
                )}
                {!user && (
                    <NavLink to="/" style={navLinkStyles} onClick={handleLinkClick} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white font-semibold">Menu</NavLink>
                )}
                <NavLink to="/track" style={navLinkStyles} onClick={handleLinkClick} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white font-semibold">Track Order</NavLink>
                <NavLink to="/about" style={navLinkStyles} onClick={handleLinkClick} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white font-semibold">About Us</NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;