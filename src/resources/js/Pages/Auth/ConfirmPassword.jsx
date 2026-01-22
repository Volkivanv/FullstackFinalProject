// resources/js/Pages/Auth/ConfirmPassword.jsx
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'));
    };

    return (
        <AppLayout>
            <Head title="Подтверждение пароля" />

            <div className="flex justify-center py-12">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Подтвердите пароль</h2>

                    <p className="text-gray-600 mb-6 text-center">
                        Для безопасности подтвердите свой пароль перед продолжением.
                    </p>

                    <form onSubmit={submit}>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                                Пароль
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                                autoFocus
                            />
                            {errors.password && <div className="mt-1 text-sm text-red-600">{errors.password}</div>}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-70"
                            >
                                {processing ? 'Проверка...' : 'Подтвердить'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
