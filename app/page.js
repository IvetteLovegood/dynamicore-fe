"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import TopBar from './components/Header';
import Sidebar from './components/Sidebar';
import Users from './pages/users';
import Contacts from './pages/contacts';

const Home = () => {
  const router = useRouter();
  const { pathname } = router;

  const renderPage = () => {
    if (pathname === '/users') {
      return <Users />;
    } else if (pathname === '/contacts') {
      return <Contacts />;
    }
    // Si no se encuentra una ruta válida, puedes mostrar una página de error o redireccionar a otra página
    return <div>Página no encontrada</div>;
  };

  return (
    <div className="app flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <TopBar />
        <main className="app-content flex-grow p-4">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default Home;
