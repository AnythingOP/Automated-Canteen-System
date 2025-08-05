import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Recommendations from './Recommendations'; // <-- Import the new component

const menuItems = [
    { id: 1, name: 'Veggie Burger', price: 150, image: 'https://placehold.co/400x300/EBF5FB/3498DB?text=Veggie+Burger' },
    { id: 2, name: 'Paneer Wrap', price: 220, image: 'https://placehold.co/400x300/F9EBEA/E74C3C?text=Paneer+Wrap' },
    { id: 3, name: 'Chole Bhature', price: 180, image: 'https://placehold.co/400x300/E8F8F5/2ECC71?text=Chole+Bhature' },
    { id: 4, name: 'French Fries', price: 90, image: 'https://placehold.co/400x300/FEF9E7/F1C40F?text=French+Fries' },
    { id: 5, name: 'Iced Coffee', price: 110, image: 'https://placehold.co/400x300/FDF2E9/DC7633?text=Iced+Coffee' },
    { id: 6, name: 'Pav Bhaji', price: 100, image:'https://placehold.co/400x300/F9EBEA/E74C3C?text=Pav+Bhaji'},
];

function CustomerView() {
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAddToCart = (item) => {
        if (!user) {
            navigate('/login');
        } else {
            addToCart(item);
        }
    };

    return (
        <div>
            {/* Add the recommendations component here */}
            <Recommendations />

            <h1 className="text-3xl font-bold text-gray-800 mb-6">Full Menu</h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {menuItems.map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover"/>
                        <div className="p-4 flex flex-col flex-grow">
                            <div className="flex-grow">
                                <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                                <p className="text-gray-700 mt-1 font-bold">Rs. {item.price.toFixed(2)}</p>
                            </div>
                            <button onClick={() => handleAddToCart(item)} className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition-colors duration-300">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CustomerView;