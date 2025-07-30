import React, { useState } from 'react';
import CustomerView from './components/CustomerView';
import KitchenView from './components/KitchenView';
import OrderStatus from './components/OrderStatus';
import './App.css';

function App() {
    const [view, setView] = useState('customer'); // customer, kitchen, status

    const renderView = () => {
        switch (view) {
            case 'kitchen':
                return <KitchenView />;
            case 'status':
                return <OrderStatus />;
            case 'customer':
            default:
                return <CustomerView />;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <header className="bg-white shadow-md">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-gray-800">
                        Automated Canteen
                    </div>
                    <div>
                        <button onClick={() => setView('customer')} className={`px-4 py-2 rounded-lg font-semibold ${view === 'customer' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} mr-2 transition-colors duration-300`}>
                            Order Food
                        </button>
                        <button onClick={() => setView('status')} className={`px-4 py-2 rounded-lg font-semibold ${view === 'status' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} mr-2 transition-colors duration-300`}>
                            Track Order
                        </button>
                        <button onClick={() => setView('kitchen')} className={`px-4 py-2 rounded-lg font-semibold ${view === 'kitchen' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'} transition-colors duration-300`}>
                            Kitchen Dashboard
                        </button>
                    </div>
                </nav>
            </header>
            <main className="container mx-auto px-6 py-8">
                {renderView()}
            </main>
        </div>
    );
}

export default App;

