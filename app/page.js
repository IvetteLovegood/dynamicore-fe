"use client";

// pages/home.js
import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Table from './components/Table';
import Modal from './components/Modal';
import Icon from './components/Icon';

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const viewUser = () => { /* código para ver usuario */ };
  const editUser = () => { /* código para editar usuario */ };
  const deleteUser = () => { /* código para eliminar usuario */ };

  const viewContact = () => { /* código para ver contacto */ };
  const editContact = () => { /* código para editar contacto */ };
  const deleteContact = () => { /* código para eliminar contacto */ };

  const userControls = [
    <Icon IconComponent={FaEye} onClick={viewUser} className="text-blue-500" />,
    <Icon IconComponent={FaEdit} onClick={editUser} className="text-yellow-500" />,
    <Icon IconComponent={FaTrash} onClick={deleteUser} className="text-red-500" />,
  ];

  const contactControls = [
    <Icon IconComponent={FaEye} onClick={viewContact} className="text-blue-500" />,
    <Icon IconComponent={FaEdit} onClick={editContact} className="text-yellow-500" />,
    <Icon IconComponent={FaTrash} onClick={deleteContact} className="text-red-500" />,
  ];

  const headers = ['Nombre', 'Correo electrónico'];
  const rows = [
    ['John Doe', 'john.doe@example.com'],
    ['Jane Doe', 'jane.doe@example.com'],
  ];

  return (
    <div className="app flex">
      <div className="flex flex-col w-full">
        <main className="app-content flex-grow p-4">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white m-2 py-2 px-4 rounded"
          >
            Agregar Usuario
          </button>
          <Table headers={headers} rows={rows} controls={userControls}/>
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          </Modal>
        </main>
      </div>
    </div>
  );
};

export default Home;
