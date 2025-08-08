import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const { order } = location.state || {};
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');

    if (!order) {
        return <Navigate to="/" />;
    }

    const handleConfirmPayment = async () => {
        setIsProcessing(true);
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/orders/${order._id}/pay`);
            clearCart();
            setPaymentSuccess(true);
        } catch (error) {
            console.error("Payment confirmation failed:", error);
            alert("There was an error processing your payment. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (paymentSuccess) {
        return (
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto text-center">
                <h2 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h2>
                <p className="text-gray-700 mb-2">Your order has been sent to the kitchen.</p>
                <p className="text-gray-700 mb-6">You can track your order with ID:</p>
                <div className="bg-gray-100 p-4 rounded-lg text-2xl font-mono font-bold text-blue-700 tracking-wider">
                    {order.orderId}
                </div>
                <button onClick={() => navigate('/track')} className="mt-8 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700">
                    Track Order
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Confirm Your Payment</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                <ul className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                        <li key={index} className="flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                            <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div className="border-t pt-4 flex justify-between font-bold text-xl">
                    <span>Total Amount:</span>
                    <span>Rs. {order.totalAmount.toFixed(2)}</span>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Select Payment Method</h3>
                <div className="space-y-3">
                    <div className="flex items-center p-3 border rounded-lg has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500">
                        <input id="card" type="radio" value="card" name="paymentMethod" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                        <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">Credit/Debit Card</label>
                    </div>
                    <div className="flex items-center p-3 border rounded-lg has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500">
                        <input id="upi" type="radio" value="upi" name="paymentMethod" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                        <label htmlFor="upi" className="ml-3 block text-sm font-medium text-gray-700">UPI</label>
                    </div>
                    <div className="flex items-center p-3 border rounded-lg has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500">
                        <input id="netbanking" type="radio" value="netbanking" name="paymentMethod" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                        <label htmlFor="netbanking" className="ml-3 block text-sm font-medium text-gray-700">Net Banking</label>
                    </div>
                </div>
            </div>

            {paymentMethod === 'card' && (
                <div className="space-y-4 mb-6 p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold">Enter Card Details</h4>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Card Number</label>
                        <input type="text" placeholder="**** **** **** 1234" className="mt-1 block w-full bg-white p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Card Holder</label>
                        <input type="text" placeholder="John Doe" className="mt-1 block w-full bg-white p-2 border border-gray-300 rounded-md" />
                    </div>
                </div>
            )}

            {paymentMethod === 'upi' && (
                <div className="space-y-4 mb-6 p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold">Enter UPI Details</h4>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">UPI ID</label>
                        <input type="text" placeholder="yourname@bank" className="mt-1 block w-full bg-white p-2 border border-gray-300 rounded-md" />
                    </div>
                </div>
            )}

            {paymentMethod === 'netbanking' && (
                <div className="space-y-4 mb-6 p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold">Enter Net Banking Details</h4>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">User ID</label>
                        <input type="text" placeholder="Your User ID" className="mt-1 block w-full bg-white p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" placeholder="••••••••" className="mt-1 block w-full bg-white p-2 border border-gray-300 rounded-md" />
                    </div>
                </div>
            )}

            <button
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="w-full mt-2 bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-400"
            >
                {isProcessing ? 'Processing...' : `Pay Rs. ${order.totalAmount.toFixed(2)}`}
            </button>
        </div>
    );
}

export default Payment;