import AppLayout from '@/Layouts/AppLayout';
import Filters from './Partials/Filters';
import ProductCard from './Partials/ProductCard';

export default function Index({ products, filters, auth }) {
    return (
        <AppLayout auth={auth}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold mb-8">Каталог товаров</h1>

                    {/* Фильтры */}
                    <Filters filters={filters} />

                    {/* Список товаров */}
                    {products.data.length === 0 ? (
                        <p className="text-gray-500">Товары не найдены</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.data.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    {/* Пагинация */}
                    <div className="mt-8">
                        {renderPagination(products.links)}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

// Простая пагинация
function renderPagination(links) {
    return (
        <div className="flex justify-center mt-4 space-x-1">
            {links.map((link) => (
                <a
                    key={link.label}
                    href={link.url}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`px-3 py-1 text-sm rounded ${link.active
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                />
            ))}
        </div>
    );
}
