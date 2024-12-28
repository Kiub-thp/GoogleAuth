import { useState, useEffect } from "react";

export default function AdminPage() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    // Lấy danh sách user từ API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/admin/users");
                const data = await res.json();
                if (data.success === false) {
                    setError(data.message);
                    return;
                }
                setUsers(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchUsers();
    }, []);

    // Xử lý xóa user
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/admin/users/${id}`, {
                method: "DELETE"
            });
            const data = await res.json();
            if (data.success === false) {
                alert(data.message);
                return;
            }
            // Cập nhật danh sách user sau khi xóa
            setUsers(users.filter((user) => user._id !== id));
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Admin Page</h1>
            {error && <p className="text-red-500">{error}</p>}
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-3 px-6 bg-gray-200">Username</th>
                        <th className="py-3 px-6 bg-gray-200">Email</th>
                        <th className="py-3 px-6 bg-gray-200">Admin</th>
                        <th className="py-3 px-6 bg-gray-200">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-t">
                            <td className="py-3 px-6">{user.username}</td>
                            <td className="py-3 px-6">{user.email}</td>
                            <td className="py-3 px-6">{user.isAdmin ? "Yes" : "No"}</td>
                            <td className="py-3 px-6">
                                <button
                                    className="text-red-500 hover:underline"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
