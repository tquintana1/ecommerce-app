// CartContext.js
import React, { createContext, useState } from "react";
import { toast } from 'sonner';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity = 1) => { // Accepts quantity parameter
        if (!product) return;

        const updatedCartItems = [...cartItems];
        for (let i = 0; i < quantity; i++) {
            updatedCartItems.push(product);
        }

        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        toast.success(`${quantity} ${quantity > 1 ? 'products' : 'product'} added to cart`);
    };

    const removeFromCart = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
        toast.info('Carrito vaciado');
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, setCartItems, removeFromCart, calculateTotal, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
