import { useState, useEffect } from 'react';

export function useCart() {
    const [items, setItems] = useState([]);
    const [changePage, setChangePage] = useState(false);

    // 🔹 Загружаем из localStorage ТОЛЬКО при монтировании
    useEffect(() => {
        const saved = localStorage.getItem('cart');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                console.log('✅ parsed from localStorage:', parsed);
                if (Array.isArray(parsed)) {
                    setItems(parsed);
                }
            } catch (e) {
                console.error('Failed to parse cart', e);
                localStorage.removeItem('cart');
            }
        }
    }, []); // ← Пустой массив — только при первом рендере

    // 🔹 Сохраняем при изменении
    useEffect(() => {
        console.log('📦 Saving to localStorage:', items);
        try {
            localStorage.setItem('cart', JSON.stringify(items));
        } catch (e) {
            console.error('Failed to save cart', e);
        }
    }, [items]);

    const addToCart = (product) => {
        setItems((prev) => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        setItems((prev) =>
            prev.map(item => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const removeFromCart = (id) => {
        setItems((prev) => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setItems([]);
        // ⚠️ Не удаляем localStorage здесь, только при выходе
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
