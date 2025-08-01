import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CustomerView from './components/CustomerView';
import KitchenView from './components/KitchenView';
import OrderStatus from './components/OrderStatus';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

// A wrapper for routes that require a user to be logged in.
function PrivateRoute({ children, roles }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="text-center p-10">Loading...</div>; // Or a spinner component
    }

    if (!user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to. This allows us to send them back after they log in.
        return <Navigate to="/login" />;
    }

    // If the route requires a specific role and the user doesn't have it,
    // redirect them to a page they do have access to.
    if (roles && !roles.includes(user.role)) {
        // A customer trying to access /kitchen should be redirected to their main page
        // A kitchen staff trying to access / (customer page) should be redirected to theirs
        const redirectPath = user.role === 'customer' ? '/' : '/kitchen';
        return <Navigate to={redirectPath} />;
    }

    return children;
}


function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="bg-gray-100 min-h-screen font-sans">
                    <Navbar />
                    <main className="container mx-auto px-6 py-8">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            
                            {/* This route is accessible to anyone */}
                            <Route path="/track" element={<OrderStatus />} />

                            {/* Protected Routes */}
                            <Route path="/" element={
                                <PrivateRoute roles={['customer']}>
                                    <CustomerView />
                                </PrivateRoute>
                            } />
                            <Route path="/kitchen" element={
                                <PrivateRoute roles={['kitchen']}>
                                    <KitchenView />
                                </PrivateRoute>
                            } />
                            
                            {/* A fallback route for any other path */}
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;