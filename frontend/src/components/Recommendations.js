import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

// We need the full menu list to find the details (like price and image) of recommended items
const menuItemsList = [
    { id: 1, name: 'Veggie Burger', price: 150, image: 'https://placehold.co/400x300/EBF5FB/3498DB?text=Veggie+Burger' },
    { id: 2, name: 'Chicken Wrap', price: 220, image: 'https://placehold.co/400x300/F9EBEA/E74C3C?text=Chicken+Wrap' },
    { id: 3, name: 'Garden Salad', price: 180, image: 'https://placehold.co/400x300/E8F8F5/2ECC71?text=Garden+Salad' },
    { id: 4, name: 'French Fries', price: 90, image: 'https://placehold.co/400x300/FEF9E7/F1C40F?text=French+Fries' },
    { id: 5, name: 'Iced Coffee', price: 110, image: 'https://placehold.co/400x300/FDF2E9/DC7633?text=Iced+Coffee' },
];

const RecommendationCard = ({ item }) => {
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAddToCart = (itemToAdd) => {
        if (!user) {
            navigate('/login');
        } else {
            addToCart(itemToAdd);
        }
    };

    if (!item) return null;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
            <img src={item.image} alt={item.name} className="w-full h-32 object-cover"/>
            <div className="p-3 flex flex-col flex-grow">
                <div className="flex-grow">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-gray-600 font-bold">Rs. {item.price.toFixed(2)}</p>
                </div>
                <button onClick={() => handleAddToCart(item)} className="mt-2 bg-orange-500 text-white font-bold py-1 px-3 rounded-lg w-full text-sm hover:bg-orange-600">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};


const Recommendations = () => {
    const [popular, setPopular] = useState([]);
    const [recent, setRecent] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        // Fetch most popular items
        axios.get(`${process.env.REACT_APP_API_URL}/api/orders/recommendations/popular`)
            .then(res => {
                const popularItemsDetails = res.data.map(popItem => 
                    menuItemsList.find(menuItem => menuItem.name === popItem._id)
                ).filter(Boolean);
                setPopular(popularItemsDetails);
            })
            .catch(err => console.error("Could not fetch popular items", err));

        // Fetch recently ordered items if the user is logged in
        if (user) {
            axios.get(`${process.env.REACT_APP_API_URL}/api/orders/recommendations/recent`)
                .then(res => {
                    // *** FIX IS HERE ***
                    // The API returns partial item data. We need to map it to our full menu list
                    // to get all details, including the image.
                    const recentItemsDetails = res.data.map(recentItem =>
                        menuItemsList.find(menuItem => menuItem.name === recentItem.name)
                    ).filter(Boolean); // Filter out any nulls
                    setRecent(recentItemsDetails);
                })
                .catch(err => console.error("Could not fetch recent items", err));
        }
    }, [user]);

    if (popular.length === 0 && recent.length === 0) {
        return null;
    }

    return (
        <div className="mb-10 p-6 bg-gray-50 rounded-lg shadow-inner">
            {recent.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Again</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {recent.map(item => <RecommendationCard key={`recent-${item.id}`} item={item} />)}
                    </div>
                </div>
            )}
            {popular.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Most Popular</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {popular.map(item => <RecommendationCard key={`popular-${item.id}`} item={item} />)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Recommendations;