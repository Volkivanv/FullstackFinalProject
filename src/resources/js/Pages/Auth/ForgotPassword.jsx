// resources/js/Pages/Auth/ForgotPassword.jsx
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <AppLayout>
            <Head title="Восстановление пароля" />

            <div className="flex justify-center py-12">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Восстановление пароля</h2>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 text-center">
                            Мы отправили ссылку для сброса пароля на ваш email.
                        </div>
                    )}

                    <p className="text-gray-600 mb-6 text-center">
                        Введите email, указанный при регистрации — мы пришлём инструкции по восстановлению.
                    </p>

                    <form onSubmit={submit}>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                                autoFocus
                            />
                            {errors.email && <div className="mt-1 text-sm text-red-600">{errors.email}</div>}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-70"
                            >
                                {processing ? 'Отправка...' : 'Отправить ссылку'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href={route('login')} className="text-sm text-indigo-600 hover:underline">
                            ← Назад ко входу
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
