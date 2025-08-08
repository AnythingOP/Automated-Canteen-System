import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/orders`;

function OrderStatus() {
    const [orderIdInput, setOrderIdInput] = useState('');
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchOrderStatus = async (id) => {
        if (!id) return;
        setIsLoading(true);
        setError('');
        setOrder(null);
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            setOrder(response.data);
        } catch (err) {
            setError('Order not found. Please check the ID and try again.');
            setOrder(null);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        if (order && order.status !== 'Completed') {
            const interval = setInterval(() => {
                fetchOrderStatus(order.orderId);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [order]);


    const handleSubmit = (e) => {
        e.preventDefault();
        fetchOrderStatus(orderIdInput.trim().toUpperCase());
    };

    const getStatusIndicator = (currentStatus) => {
        const statuses = ['Received', 'Preparing', 'Ready for Pickup', 'Completed'];
        const currentIndex = statuses.indexOf(currentStatus);
        
        return (
            <div className="flex items-center justify-center space-x-2 sm:space-x-4 my-8">
                {statuses.map((status, index) => {
                    const isActive = index <= currentIndex;
                    return (
                        <React.Fragment key={status}>
                            <div className="flex flex-col items-center text-center">
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}>
                                    {isActive ? '✓' : index + 1}
                                </div>
                                <p className={`mt-2 text-xs sm:text-sm font-semibold ${isActive ? 'text-green-600' : 'text-gray-500'}`}>{status}</p>
                            </div>
                            {index < statuses.length - 1 && (
                                <div className={`flex-1 h-1 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Track Your Order</h2>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={orderIdInput}
                    onChange={(e) => setOrderIdInput(e.target.value)}
                    placeholder="Enter your Order ID (e.g., ORD-XXXXXX)"
                    className="flex-grow p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button type="submit" disabled={isLoading} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400">
                    {isLoading ? 'Searching...' : 'Track Order'}
                </button>
            </form>

            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

            {order && (
                <div className="mt-8 border-t pt-6">
                    <h3 className="text-2xl font-bold text-center text-gray-800">Order Status</h3>
                    <p className="text-center text-lg font-mono text-gray-600 mb-4">{order.orderId}</p>
                    {getStatusIndicator(order.status)}
                     <div className="bg-gray-50 p-4 rounded-lg mt-6">
                        <h4 className="font-bold text-lg mb-2">Order Summary</h4>
                        <ul className="list-disc list-inside text-gray-700">
                            {order.items.map((item, index) => (
                                <li key={index}>{item.quantity}x {item.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderStatus;