import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'http://localhost:5001/api/orders';

function Cart() {
    const { cart, addToCart, decreaseQuantity, removeFromCart, totalAmount } = useCart();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleProceedToPayment = async () => {
        setIsLoading(true);
        try {
            const orderDetails = {
                items: cart.map(({ id, ...rest }) => rest),
                totalAmount: totalAmount,
            };
            const response = await axios.post(API_URL, orderDetails);
            navigate('/payment', { state: { order: response.data } });
        } catch (error) {
            console.error("Failed to create order:", error);
            alert("Error creating order. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="text-center p-10 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
                <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700">
                    Browse Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Your Shopping Cart</h2>
            <div className="space-y-4">
                {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                            <span className="font-semibold text-lg">{item.name}</span>
                            <span className="text-gray-600 ml-4">Rs. {item.price.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-md">
                                <button onClick={() => decreaseQuantity(item)} className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100">-</button>
                                <span className="px-4 py-1">{item.quantity}</span>
                                <button onClick={() => addToCart(item)} className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100">+</button>
                            </div>
                            <span className="font-bold w-24 text-right">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                            <button onClick={() => removeFromCart(item)} className="text-red-500 hover:text-red-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 pt-6 border-t">
                <div className="flex justify-end items-center">
                    <span className="text-xl font-medium text-gray-700 mr-4">Total:</span>
                    <span className="text-2xl font-bold text-gray-900">Rs. {totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={handleProceedToPayment} disabled={isLoading} className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-400">
                        {isLoading ? 'Processing...' : 'Proceed to Payment'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;