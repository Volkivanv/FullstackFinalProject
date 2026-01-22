import { Link } from '@inertiajs/react';

export default function Sidebar({ onClose }) {
  return (
    <aside className="w-64 bg-indigo-800 text-white h-full fixed inset-y-0 left-0 z-30 shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Middle Market</h2>
        <button
          onClick={onClose}
          className="lg:hidden mt-4 text-indigo-200 hover:text-white"
        >
          Закрыть
        </button>
      </div>
      <nav className="mt-6">
        <ul>
          <li>
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center px-6 py-3 text-gray-200 hover:bg-indigo-700"
            >
              🏠 Главная
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              onClick={onClose}
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
