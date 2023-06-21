import React from 'react';
import TopBar from './components/Header';
import Sidebar from './components/Sidebar';

const Home = () => (
  <div className="app flex">
    <Sidebar />
    <div className="flex flex-col w-full">
      <TopBar />
      <main className="app-content flex-grow p-4">
        {/* Aquí es donde irá el contenido principal de tu página */}dsfsd
      </main>
    </div>
  </div>
);

export default Home;