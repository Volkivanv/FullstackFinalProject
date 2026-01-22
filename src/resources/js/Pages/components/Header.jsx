import { Link } from '@inertiajs/react';

export default function Header({ auth }) {
    return (
        <header className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">OurHeatExcangers</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link href="/" className="hover:underline">Home</Link></li>
                        <li><Link href="/products" className="hover:underline">Products</Link></li>

                        {auth.user ? (
                            <>
                                <li><Link href="/dashboard" className="hover:underline">Dashboard</Link></li>
                                <li>
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        Inertia.post('/logout');
                                    }}>
                                        <button type="submit" className="hover:underline">Logout</button>
                                    </form>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><Link href="/login" className="hover:underline">Login</Link></li>
                                <li><Link href="/register" className="hover:underline">Register</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}



