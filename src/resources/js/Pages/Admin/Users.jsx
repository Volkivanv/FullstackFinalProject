export default function Users({ users, roles }) {
    const handleSubmit = (e, userId) => {
        e.preventDefault();
        const form = e.target;
        const roleId = form.role.value;

        router.put(
            route('admin.users.update', userId),
            {
                role_id: roleId,
                onSuccess: () => toast.success('Роль обновлена'),
                onError: (err) => toast.error('Ошибка'),
            }
        );
    };

    return (
        <div className="max-w-4xl mx-auto py-12">
            <h1 className="text-2xl font-bold mb-6">Управление ролями</h1>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">Имя</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Роль</th>
                        <th className="py-2 px-4 border">Действие</th>
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
                                    >
                                        Сохранить
                                    </button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
