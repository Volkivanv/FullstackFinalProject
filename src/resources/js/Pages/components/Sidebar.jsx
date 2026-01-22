import { Link } from '@inertiajs/react';

export default function Sidebar({ userName }) {
    return (
        <aside className="w-64 bg-indigo-800 text-white fixed h-full shadow-lg">
            <div className="p-6">
                <h2 className="text-2xl font-bold">Middle Market</h2>
                {userName && (
                    <p className="mt-2 text-sm text-indigo-200">
                        Привет, <span className="font-semibold">{userName}</span>!
                    </p>
                )}
            </div>
            <nav className="mt-6">
                <ul>
                    <li>
                        <Link
                            href="/"
                            className="flex items-center px-6 py-3 text-gray-200 hover:bg-indigo-700"
                        >
                            🏠 Главная
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/products"
                            className="flex items-center px-6 py-3 text-gray-200 hover:bg-indigo-700"
                        >
                            🛒 Товары
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
