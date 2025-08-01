import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CustomerView from './components/CustomerView';
import KitchenView from './components/KitchenView';
import OrderStatus from './components/OrderStatus';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Payment from './components/Payment'; // Import the new Payment component
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // Import the new CartProvider
import './App.css';

// A wrapper for routes that require a user to be logged in.
function PrivateRoute({ children, roles }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="text-center p-10">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(user.role)) {
        const redirectPath = user.role === 'customer' ? '/' : '/kitchen';
        return <Navigate to={redirectPath} />;
    }

    return children;
}


function App() {
    return (
        <AuthProvider>
            {/* Wrap the entire app in the CartProvider */}
            <CartProvider>
                <Router>
                    <div className="bg-gray-100 min-h-screen font-sans">
                        <Navbar />
                        <main className="container mx-auto px-6 py-8">
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
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
                                <Route path="/payment" element={
                                    <PrivateRoute roles={['customer']}>
                                        <Payment />
                                    </PrivateRoute>
                                } />
                                
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </main>
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;