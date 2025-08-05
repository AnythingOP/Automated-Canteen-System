import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/orders';

function KitchenView() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(API_URL);
            setOrders(response.data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 5000); // Poll for new orders every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await axios.put(`${API_URL}/${orderId}`, { status: newStatus });
            fetchOrders(); // Refresh list after update
        } catch (error) {
            console.error("Failed to update order status:", error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Received': return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'Preparing': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'Ready for Pickup': return 'bg-green-100 text-green-800 border-green-300';
            case 'Completed': return 'bg-gray-200 text-gray-600 border-gray-300';
            default: return 'bg-gray-100';
        }
    };

    const renderOrdersByStatus = (status, nextStatus) => {
        return orders
            .filter(order => order.status === status)
            .map(order => (
                // UPDATED: The entire div is now clickable to move the order to the next stage
                <div 
                    key={order._id} 
                    className={`p-4 rounded-lg shadow-md mb-4 border-l-4 ${getStatusColor(order.status)} ${nextStatus ? 'cursor-pointer hover:shadow-lg hover:border-l-8' : ''} transition-all duration-200`}
                    onClick={() => nextStatus && updateOrderStatus(order._id, nextStatus)}
                >
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-lg text-gray-800">{order.orderId}</h4>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                        </span>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-1 mb-4">
                        {order.items.map((item, index) => (
                            <li key={index}>{item.quantity}x {item.name}</li>
                        ))}
                    </ul>
                    {/* The "Mark as Completed" button is kept for the final, deliberate action */}
                    {order.status === 'Ready for Pickup' && (
                        <div className="text-right mt-2">
                             <button 
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent the card's onClick from firing
                                    updateOrderStatus(order._id, 'Completed');
                                }} 
                                className="bg-gray-500 text-white text-sm font-bold py-1 px-3 rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Mark as Completed
                            </button>
                        </div>
                    )}
                </div>
            ));
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Kitchen Dashboard</h2>
            {isLoading ? <p>Loading orders...</p> : (
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-blue-700">Received</h3>
                        <div className="bg-gray-50 p-4 rounded-lg min-h-[200px]">
                            {renderOrdersByStatus('Received', 'Preparing')}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-yellow-700">Preparing</h3>
                        <div className="bg-gray-50 p-4 rounded-lg min-h-[200px]">
                            {renderOrdersByStatus('Preparing', 'Ready for Pickup')}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-green-700">Ready for Pickup</h3>
                        <div className="bg-gray-50 p-4 rounded-lg min-h-[200px]">
                            {renderOrdersByStatus('Ready for Pickup', null)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default KitchenView;