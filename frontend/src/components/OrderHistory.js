import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/my-history`);
                setOrders(res.data);
            } catch (err) {
                setError('Failed to fetch order history.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, []);

    if (loading) return <div className="text-center p-10">Loading your order history...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Order History</h1>
            {orders.length === 0 ? (
                <p>You haven't placed any orders yet.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order._id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="font-bold text-lg">Order ID: {order.orderId}</h2>
                                <span className="font-semibold text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="mb-3">Status: <span className="font-semibold">{order.status}</span></p>
                            <ul className="list-disc list-inside mb-3 pl-2">
                                {order.items.map((item, index) => (
                                    <li key={index}>{item.quantity}x {item.name}</li>
                                ))}
                            </ul>
                            <p className="text-right font-bold text-lg">Total: Rs. {order.totalAmount.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;