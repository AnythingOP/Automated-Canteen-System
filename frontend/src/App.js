import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import CustomerView from './components/CustomerView';
import KitchenView from './components/KitchenView';
import OrderStatus from './components/OrderStatus';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Payment from './components/Payment';
import Cart from './components/Cart';
import Sidebar from './components/Sidebar';
import OrderHistory from './components/OrderHistory';
import AboutUs from './components/AboutUs';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import './App.css';

function PrivateRoute({ children, roles }) {
    const { user, loading } = useAuth();
    if (loading) return <div className="p-10 text-center">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (roles && !roles.includes(user.role)) {
        const redirectPath = user.role === 'customer' ? '/' : '/kitchen';
        return <Navigate to={redirectPath} />;
    }
    return children;
}

// A new component to handle the main layout, so we can use hooks
const AppLayout = () => {
    const { user } = useAuth();
    const location = useLocation();

    // Define routes where the sidebar should be hidden
    const noSidebarRoutes = ['/login', '/register', '/kitchen'];

    // Determine if the sidebar should be shown
    const showSidebar = user ? !noSidebarRoutes.includes(location.pathname) && user.role !== 'kitchen' : !noSidebarRoutes.includes(location.pathname);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Conditionally render the Sidebar */}
            {showSidebar && <Sidebar />}

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<CustomerView />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/track" element={<OrderStatus />} />
                        <Route path="/about" element={<AboutUs />} />

                        {/* Protected Routes */}
                        <Route path="/cart" element={<PrivateRoute roles={['customer']}><Cart /></PrivateRoute>} />
                        <Route path="/history" element={<PrivateRoute roles={['customer']}><OrderHistory /></PrivateRoute>} />
                        <Route path="/kitchen" element={<PrivateRoute roles={['kitchen']}><KitchenView /></PrivateRoute>} />
                        <Route path="/payment" element={<PrivateRoute roles={['customer']}><Payment /></PrivateRoute>} />
                        
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    {/* Use the new AppLayout component */}
                    <AppLayout />
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;