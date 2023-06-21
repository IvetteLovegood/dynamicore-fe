"use client";

import React from 'react';

const Contacts = () => {
  const users = [
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Users</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">
                <button className="bg-blue-500 text-white p-2 rounded">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;
