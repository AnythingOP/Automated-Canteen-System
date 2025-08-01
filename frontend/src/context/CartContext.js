import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from localStorage when the component mounts
    useEffect(() => {
        const savedCart = localStorage.getItem('canteenCart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('canteenCart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return currentCart.map(cartItem =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            }
            return [...currentCart, { ...item, quantity: 1 }];
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    const value = {
        cart,
        addToCart,
        clearCart,
        totalAmount,
        totalItems
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};