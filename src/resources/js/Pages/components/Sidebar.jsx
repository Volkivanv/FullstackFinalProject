import { Link } from "@inertiajs/react";

export default function Sidebar({ userName }) {
    return (
        <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg z-20">
            <div className="p-4">
                <h2 className="text-xl font-bold">Меню</h2>
                <p className="text-sm text-gray-300">Привет, {userName}</p>
            </div>
            <nav className="mt-4">
                <ul className="space-y-2 px-2">
                    <li><Link href="/" className="block p-2 rounded hover:bg-gray-700">Главная</Link></li>
                    <li><Link href="/products" className="block p-2 rounded hover:bg-gray-700">Продукты</Link></li>
                    <li><Link href="/cart" className="block p-2 rounded hover:bg-gray-700">Корзина</Link></li>
                </ul>
            </nav>
        </div>
    );
}

