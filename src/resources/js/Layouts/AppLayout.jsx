import Header from '@/Pages/Сomponents/Header';
import Sidebar from '@/Pages/Сomponents/Sidebar';
import { useState } from 'react';


export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (мобильный) */}
      <div
        className={`fixed inset-0 z-20 transition-transform duration-300 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Overlay при открытом Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar (десктоп) */}
      <div className="hidden lg:block lg:w-64">
        <Sidebar />
      </div>

      {/* Основной контент */}
      <div className="flex-1 lg:ml-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto" style={{ maxWidth: '1600px' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
