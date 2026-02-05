import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import toast from 'react-hot-toast'; // ✅ Импортируем

export function useSyncCartFromAuth() {
  const { auth } = usePage().props;

  useEffect(() => {
    const user = auth?.user;
    if (!user) return;

    const savedCart = localStorage.getItem('cart');
    const isCartEmpty = !savedCart || savedCart === '[]' || savedCart === 'null';

    if (isCartEmpty && Array.isArray(user.cart) && user.cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(user.cart));
  //    console.log('🔄 Корзина восстановлена из БД');

      // ✅ Показываем toast
      toast.success(`🛒 Восстановлено ${user.cart.length} ${declineQuantity(user.cart.length)} из прошлой сессии`, {
        duration: 6000,
      });
    }
  }, [auth?.user]);
}

// Вспомогательная функция для склонения
function declineQuantity(count) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'товаров';
  }

  if (lastDigit === 1) {
    return 'товар';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'товара';
  }

  return 'товаров';
}
