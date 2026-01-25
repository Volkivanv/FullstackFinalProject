import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';

export default function Filters({ filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || '');
    const [priceFrom, setPriceFrom] = useState(filters.price_from || '');
    const [priceTo, setPriceTo] = useState(filters.price_to || '');

    const applyFilters = (e) => {
        e.preventDefault();
        router.get(
            route('products.index'),
            {
                search: search || undefined,
                type: type || undefined,
                price_from: priceFrom || undefined,
                price_to: priceTo || undefined,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const resetFilters = () => {
        setSearch('');
        setType('');
        setPriceFrom('');
        setPriceTo('');
        router.get(route('products.index'), {}, { replace: true });
    };

    const { productTypes } = usePage().props;

    return (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">Фильтры</h2>
            <form onSubmit={applyFilters} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Поиск */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Поиск</label>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Название или описание"
                    />
                </div>

                {/* Тип */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Тип</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Все типы</option>
                        {productTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                {/* Цена от */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Цена от</label>
                    <input
                        type="number"
                        value={priceFrom}
                        onChange={(e) => setPriceFrom(e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="0"
                    />
                </div>

                {/* Цена до */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Цена до</label>
                    <input
                        type="number"
                        value={priceTo}
                        onChange={(e) => setPriceTo(e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="10000"
                    />
                </div>

                {/* Кнопки */}
                <div className="flex space-x-2 pt-6">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Применить
                    </button>
                    {(search || type || priceFrom || priceTo) && (
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Сбросить
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
