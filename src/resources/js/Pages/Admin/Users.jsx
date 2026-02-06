import { router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

import { toast } from 'react-hot-toast';

import { useState } from 'react';

export default function Users({ auth, users: initialUsers, roles }) {
    const [users, setUsers] = useState(initialUsers);
    const handleSubmit = (e, userId) => {
        e.preventDefault();
        const form = e.target;
        const roleId = form.role.value;
        const select = form.role;
        const saveButton = form.querySelector('button[type="submit"]');

        router.put(
            route('admin.users.update', userId),
            {
                role_id: roleId,
                onSuccess: () => {
                    toast.success('Роль обновлена');
                    // После успешного сохранения скрываем кнопку и обновляем текущее значение
                    if (saveButton) {
                        saveButton.style.display = 'none';
                    }
                    select.setAttribute('data-current-value', roleId);
                },
                onError: (err) => toast.error('Ошибка'),
            }
        );
    };

    const handleDelete = (userId) => {
        if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
            router.delete(
                route('admin.users.destroy', userId),
                {
                    onSuccess: () => {
                        toast.success('Пользователь удалён');
                        // Удаляем пользователя из списка
                        setUsers(users.filter(u => u.id !== userId));
                    },
                    onError: (err) => toast.error('Ошибка при удалении'),
                }
            );
        }
    };

    return (
        <AppLayout auth={auth}>
        <div className="max-w-4xl mx-auto py-12">
            <h1 className="text-2xl font-bold mb-6">Управление пользователями</h1>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">Имя</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Роль</th>
                        <th className="py-2 px-4 border">Описание</th>
                        <th className="py-2 px-4 border">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="py-2 px-4 border">{user.name}</td>
                            <td className="py-2 px-4 border">{user.email}</td>
                            <td className="py-2 px-4 border">
                                <form onSubmit={(e) => handleSubmit(e, user.id)}>
                                    <select
                                        name="role"
                                        defaultValue={user.role_id}
                                        className="border rounded px-2 py-1"
                                        onChange={(e) => {
                                            const form = e.target.form;
                                            const saveButton = form.querySelector('button[type="submit"]');
                                            const currentValue = e.target.getAttribute('data-current-value');
                                            if (saveButton) {
                                                saveButton.style.display = e.target.value != currentValue ? 'inline-block' : 'none';
                                            }
                                        }}
                                        data-current-value={user.role_id}
                                    >
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>
                                                {role.display_name}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        type="submit"
                                        className="ml-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                        style={{ display: 'none' }}
                                    >
                                        Сохранить
                                    </button>
                                </form>
                            </td>
                            <td className="py-2 px-4 border">{user.role?.description || 'Нет описания'}</td>
                            <td className="py-2 px-4 border">
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </AppLayout>
    );
}
