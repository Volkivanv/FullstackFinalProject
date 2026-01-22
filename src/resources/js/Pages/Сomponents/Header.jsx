import { Link } from '@inertiajs/react';

export default function Header({ onMenuClick }) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Логотип */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden mr-4 text-gray-600 hover:text-gray-900"
            aria-label="Открыть меню"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-indigo-600">Middle Market</h1>
        </div>

        {/* Навигация (десктоп) */}
        <nav className="hidden lg:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-indigo-600">Главная</Link>
          <Link href="/products" className="text-gray-700 hover:text-indigo-600">Каталог</Link>
        </nav>
      </div>
    </header>
  );
}
