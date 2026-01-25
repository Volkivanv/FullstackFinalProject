import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export function useSyncCartFromAuth() {
    const { auth } = usePage().props; // ← Следит за изменениями props

    useEffect(() => {
        const user = auth?.user;
        if (!user) return;

        const savedCart = localStorage.getItem('cart');
        const isCartEmpty = !savedCart || savedCart === '[]' || savedCart === 'null';

        if (isCartEmpty && Array.isArray(user.cart) && user.cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(user.cart));
            console.log('🔄 Корзина синхронизирована из БД при входе:', user.cart);
        }
    }, [auth?.user]); // ← Срабатывает при изменении auth.user
}
