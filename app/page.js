"use client";

import React, { Fragment, useEffect, useState, useMemo } from 'react';
import Table from './components/Table';
import Modal from './components/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { getUsers, getUserById, userDelete, addUser, editUserByID } from './utils/userService';
import { getContactsById, contactDelete, addContact, editContactbyID } from './utils/contactService';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenEdit, setModalOpenEdit] = useState(false);
  const [users, setUsers] = useState([]);
  const [showContacts, setShowContacts] = useState(false);
  const [contacts, setContacts] = useState();
  const [name, setName] = useState();
  const [idUser, setIdUser] = useState();
  const [editingUser, setEditingUser] = useState(null);
  const [editingContact, setEditingContact] = useState(null);

  useEffect(() => {
    getUsuarios();
  }, []);

  const UserForm = () => {
    const [name, setName] = useState(editingUser ? editingUser.name : '');
    const [email, setEmail] = useState(editingUser ? editingUser.email : '');
    const [password, setPassword] = useState(editingUser ? editingUser.password : '');

    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        if (editingUser) {
          const updatedUser = {id: editingUser.id, name, email, password }
          const updateUser = await editUserByID(editingUser.id, updatedUser);
          console.log(updateUser)
          notify("Usuario modificado correctamente", "success");
          setModalOpen(false);
          setEditingUser(null);
          await getUsuarios();
        } else {
        let registerUser = { name, email, password }
        const agregarUsuario = await addUser(registerUser);
        notify("Usuario agregado correctamente", "success");
        setModalOpen(false);
        await getUsuarios();}
      } catch (error) {
        notify("Error al obtener detalles del usuario", "error");
      }

    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" className="w-full p-2 border border-gray-300 rounded" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico" className="w-full p-2 border border-gray-300 rounded" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" className="w-full p-2 border border-gray-300 rounded" />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">{editingUser ? 'Modificar' : 'Agregar'}</button>
      </form>
    );
  };

  const ContactForm = () => {
    const [name, setName] = useState(editingContact ? editingContact.name : '');
    const [phone, setPhone] = useState(editingContact ? editingContact.phone : '');
    const [email, setEmail] = useState(editingContact ? editingContact.email : '');

    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        if (editingContact) {
          const updatedContact = {id: editingContact.id, name, phone, email }
          console.log(editingContact.id)
          const updateCont = await editContactbyID(editingContact.id, updatedContact);
          console.log(updateCont)
          notify("Contacto modificado correctamente", "success");
          setModalOpenEdit(false);
          setEditingContact(null);
          showContacts(false);
        } else {
        let userId = idUser;
        let registerContact = { userId, name, phone, email }
        const addContactForm = await addContact(registerContact);
        console.log(addContactForm)
        notify("Usuario agregado correctamente", "success");
        setModalOpenEdit(false);
        setShowContacts(false)
        await getContactsById(userId);}
      } catch (error) {
        notify("Error al obtener detalles del usuario", error);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" className="w-full p-2 border border-gray-300 rounded" />
        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Teléfono" className="w-full p-2 border border-gray-300 rounded" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico" className="w-full p-2 border border-gray-300 rounded" />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded"> {editingContact ? 'Modificar' : 'Agregar'}</button>
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

  const editUser = async (id) => {
    const userEdit = await getUserById(id);
    console.log(userEdit)
    setEditingUser(userEdit);
    setModalOpen(true);
   };
  const editContact = async (id) => {
    const contactEdit = await getContactsById(idUser);
    console.log(contactEdit)
    setEditingContact(contactEdit[0]);
    setModalOpenEdit(true);
   };


  const viewContact = (id) => { console.log(`Viewing contact with ID: ${id}`); };

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
          <Modal isOpen={isModalOpenEdit} onClose={() => setModalOpenEdit(false)}>
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
