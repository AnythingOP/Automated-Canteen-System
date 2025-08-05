import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('canteenCart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

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

    // New function to decrease quantity
    const decreaseQuantity = (item) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
            if (existingItem.quantity === 1) {
                // If quantity is 1, remove the item from the cart
                return currentCart.filter(cartItem => cartItem.id !== item.id);
            }
            // Otherwise, just decrease the quantity
            return currentCart.map(cartItem =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
            );
        });
    };

    // New function to remove an item completely
    const removeFromCart = (item) => {
        setCart(currentCart => currentCart.filter(cartItem => cartItem.id !== item.id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    const value = {
        cart,
        addToCart,
        decreaseQuantity, // <-- Expose new function
        removeFromCart,   // <-- Expose new function
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