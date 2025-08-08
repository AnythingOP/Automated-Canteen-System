import React, { useState } from 'react';
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

const AppLayout = () => {
    const { user } = useAuth();
    const location = useLocation();
    // State to control the mobile sidebar visibility
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const noSidebarRoutes = ['/login', '/register'];
    const isKitchenRoute = location.pathname === '/kitchen';

    // Sidebar should be shown if not on a no-sidebar route AND (the user is not kitchen staff OR the user is kitchen staff but on a different page)
    const showSidebar = !noSidebarRoutes.includes(location.pathname) && !isKitchenRoute;

    return (
        <div className="relative min-h-screen md:flex">
            {/* Mobile menu overlay */}
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`} 
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Sidebar */}
            {showSidebar && <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}

            <div className="flex-1 flex flex-col">
                {/* Pass sidebar state and toggle function to Navbar */}
                <Navbar onMenuButtonClick={() => setIsSidebarOpen(s => !s)} />
                <main className="flex-1 overflow-y-auto bg-gray-100 p-4 sm:p-6">
                    <Routes>
                        <Route path="/" element={<CustomerView />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/track" element={<OrderStatus />} />
                        <Route path="/about" element={<AboutUs />} />
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
                    <AppLayout />
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;