import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext'; // Import useCart hook
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5001/api/orders';

const menuItems = [
    { id: 1, name: 'Veggie Burger', price: 5.99 },
    { id: 2, name: 'Chicken Wrap', price: 7.50 },
    { id: 3, name: 'Garden Salad', price: 6.25 },
    { id: 4, name: 'French Fries', price: 2.99 },
    { id: 5, name: 'Iced Coffee', price: 3.49 },
];

function CustomerView() {
    // Use the global cart state and functions
    const { cart, addToCart, totalAmount } = useCart();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        setIsLoading(true);
        try {
            const orderDetails = {
                items: cart.map(({ id, ...rest }) => rest),
                totalAmount: totalAmount,
            };
            const response = await axios.post(API_URL, orderDetails);
            // Instead of showing confirmation, navigate to the payment page
            // Pass the newly created order details in the navigation state
            navigate('/payment', { state: { order: response.data } });
        } catch (error) {
            console.error("Failed to create order:", error);
            alert("Error creating order. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Menu</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems.map(item => (
                        <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                                <p className="text-gray-600 mt-1">${item.price.toFixed(2)}</p>
                                <button onClick={() => addToCart(item)} className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition-colors duration-300">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">Your Order</h2>
                {cart.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                    <>
                        <ul className="space-y-3 mb-4">
                            {cart.map(item => (
                                <li key={item.id} className="flex justify-between items-center text-gray-700">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="border-t pt-4">
                            <div className="flex justify-between font-bold text-xl text-gray-900">
                                <span>Total:</span>
                                <span>${totalAmount.toFixed(2)}</span>
                            </div>
                            <button onClick={handlePlaceOrder} disabled={isLoading} className="mt-6 bg-green-600 text-white font-bold py-3 px-4 rounded-lg w-full hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-400">
                                {isLoading ? 'Proceeding...' : 'Proceed to Payment'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CustomerView;