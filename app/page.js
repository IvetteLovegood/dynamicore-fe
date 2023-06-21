"use client";

import React, { Fragment, useEffect, useState, useMemo } from 'react';
import Table from './components/Table';
import Modal from './components/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { getUsers, getUserById, userDelete, addUser } from './utils/userService';
import { getContactsById, contactDelete, addContact } from './utils/contactService';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenEdit, setModalOpenEdit] = useState(false);
  const [users, setUsers] = useState([]);
  const [showContacts, setShowContacts] = useState(false);
  const [contacts, setContacts] = useState();
  const [name, setName] = useState();
  const [idUser, setIdUser] = useState();

  useEffect(() => {
    getUsuarios();
  }, []);

  const UserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        let registerUser = { name, email, password }
        const agregarUsuario = await addUser(registerUser);
        notify("Usuario agregado correctamente", "success");
        setModalOpen(false);
        await getUsuarios();
      } catch (error) {
        notify("Error al obtener detalles del usuario", "error");
      }

    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" className="w-full p-2 border border-gray-300 rounded" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico" className="w-full p-2 border border-gray-300 rounded" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" className="w-full p-2 border border-gray-300 rounded" />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Agregar</button>
      </form>
    );
  };

  const ContactForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        let userId = idUser;
        let registerContact = { userId, name, phone, email }
        const addContactForm = await addContact(registerContact);
        console.log(addContactForm)
        notify("Usuario agregado correctamente", "success");
        setModalOpenEdit(false);
        await getContactsById(idUser);
      } catch (error) {
        notify("Error al obtener detalles del usuario", "error");
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" className="w-full p-2 border border-gray-300 rounded" />
        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Teléfono" className="w-full p-2 border border-gray-300 rounded" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico" className="w-full p-2 border border-gray-300 rounded" />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Agregar</button>
      </form>
    );
  };

  const notify = (message, type) => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      default:
        toast(message);
    }
  };

  const getUsuarios = async () => {
    try {
      const users = await getUsers();
      setUsers(users);
    } catch (error) {
      notify("Error al obtener usuarios", "error");
    }
  }

  const viewUser = async (id) => {
    try {
      const contacts = await getContactsById(id);
      const userName = await getUserById(id);
      setName(userName.name);
      setIdUser(userName.id)
      setContacts(contacts);
      setShowContacts(true);
    } catch (error) {
      notify("Error al obtener detalles del usuario", "error");
    }
  };

  const deleteUser = async (id) => {
    try {
      await userDelete(id);
      getUsuarios();
      notify("Usuario eliminado correctamente", "success");
    } catch (error) {
      notify("Error al eliminar usuario", "error");
    }
  };

  const deleteContact = async (id) => {
    try {
      await contactDelete(id);
      notify("Contacto eliminado correctamente", "success");
    } catch (error) {
      notify("Error al eliminar contacto", "error");
    }
  };

  const editUser = (id) => { console.log(`Editing user with ID: ${id}`); };
  const viewContact = (id) => { console.log(`Viewing contact with ID: ${id}`); };
  const editContact = (id) => { console.log(`Editing contact with ID: ${id}`); };

  const headers = useMemo(() => ['Nombre', 'Correo electrónico'], []);
  const headersContact = useMemo(() => ['Nombre', 'Teléfono', 'Correo electrónico'], []);

  const userTableConfig = useMemo(() => ({
    fields: ['name', 'email'],
    controls: ['viewUser', 'editUser', 'deleteUser'],
  }), []);

  const contactTableConfig = useMemo(() => ({
    fields: ['name', 'phone', 'email'],
    controls: ['editContact', 'deleteContact'],
  }), []);

  return (
    <div className="app flex">
      <ToastContainer />
      <div className="flex flex-col w-full">
        <main className="app-content flex-grow p-4">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white m-2 py-2 px-4 rounded"
          >
            Agregar Usuario
          </button>
          {users && <Table headers={headers} rows={users} controls={{ viewUser, editUser, deleteUser }} config={userTableConfig} />}
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <UserForm />
          </Modal>
          <Modal isOpen={isModalOpenEdit} onClose={() => setModalOpen(false)}>
            <ContactForm />
          </Modal>
          {showContacts && (
            contacts.length > 0 ? (
              <Fragment>
                <button
                  onClick={() => setModalOpenEdit(true)}
                  className="bg-blue-500 hover:bg-blue-700 text-white m-2 py-2 px-4 rounded"
                >
                  Agregar Contacto
                </button>
                Contactos de {name}
                <Table headers={headersContact} rows={contacts} controls={{ viewContact, editContact, deleteContact }} config={contactTableConfig} />
              </Fragment>
            ) : (
              <Fragment>               <button
                onClick={() => setModalOpenEdit(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white m-2 py-2 px-4 rounded"
              >
                Agregar Contacto
              </button>
              <p>No hay contactos registrados para este usuario</p>
              </Fragment>
            )
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
