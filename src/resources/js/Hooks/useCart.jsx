// resources/js/Hooks/useCart.js

import { useState, useEffect } from 'react';

export function useCart() {
    const [items, setItems] = useState([]);

    // Загружаем из localStorage при старте
    useEffect(() => {
        const saved = localStorage.getItem('cart');
        if (saved) {
            setItems(JSON.parse(saved));
        }
    }, []);

    // Сохраняем в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product) => {
        setItems((prev) => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        setItems((prev) =>
            prev.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (id) => {
        setItems((prev) => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
        items,
        total,
        totalItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart
    };
}
