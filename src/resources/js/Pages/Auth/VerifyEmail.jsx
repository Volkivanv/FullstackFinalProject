// resources/js/Pages/Auth/VerifyEmail.jsx
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <AppLayout>
            <Head title="Подтверждение email" />

            <div className="flex justify-center py-12">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Подтвердите email</h2>

                    <p className="text-gray-600 mb-6">
                        Прежде чем продолжить, проверьте свою почту на наличие письма с ссылкой для подтверждения.
                    </p>

                    {status === 'verification-link-sent' && (
                        <div className="mb-6 text-sm font-medium text-green-600">
                            Новая ссылка для подтверждения отправлена на ваш email.
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-70"
                        >
                            {processing ? 'Отправка...' : 'Отправить письмо повторно'}
                        </button>
                    </form>

                    <div className="mt-6">
                        <Link href={route('logout')} method="post" as="button" className="text-sm text-gray-600 hover:underline">
                            Выйти из аккаунта
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
