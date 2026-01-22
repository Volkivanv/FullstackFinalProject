import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <AppLayout>
            <Head title="О нас" />

            <div className="py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">О магазине «Middle Market»</h1>

                        <div className="prose max-w-none">
                            <p className="text-lg text-gray-700 mb-4">
                                Добро пожаловать в <strong>Middle Market</strong> — интернет-магазин, созданный с заботой о качестве и удобстве покупок.
                            </p>

                            <p className="text-gray-700 mb-6">
                                Мы предлагаем широкий ассортимент товаров по доступным ценам. Наши поставщики тщательно проверяются, а каждый товар проходит контроль качества.
                            </p>

                            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Почему выбирают нас?</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                <li>Быстрая доставка по всей стране</li>
                                <li>Гарантия возврата в течение 30 дней</li>
                                <li>Поддержка 24/7</li>
                                <li>Честные отзывы от реальных покупателей</li>
                            </ul>

                            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Наша миссия</h2>
                            <p className="text-gray-700">
                                Сделать покупки простыми, приятными и безопасными. Мы стремимся к тому, чтобы каждый клиент чувствовал себя уверенно и комфортно.
                            </p>
                        </div>

                        <div className="mt-10 text-center">
                            <a
                                href="/products"
                                className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                            >
                                Перейти в каталог
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
