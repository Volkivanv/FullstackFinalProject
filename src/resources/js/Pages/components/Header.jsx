import { Link } from '@inertiajs/react';

export default function Header() {
    return (
        <header className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Final</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link href="/" className="hover:underline transition">Home</Link></li>
                        <li><Link href="/about" className="hover:underline transition">About</Link></li>
                        <li><Link href="/products" className="nav-link">Products</Link></li>
                        <li><Link href="#" className="hover:underline transition">Login</Link></li>
                        <li><Link href="#" className="hover:underline transition">Register</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}


