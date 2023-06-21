"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`h-screen ${isOpen ? 'w-64' : 'w-24'} bg-blue-500 p-4 transition-width duration-200`}>
      <button onClick={() => setIsOpen(!isOpen)} className="mb-4 bg-blue-500 text-white p-2 rounded">
        {isOpen ? 'Collapse' : 'Expand'}
      </button>
      <nav>
        <ul className="space-y-2">
          <li className='text-white'><Link href="/user">Users</Link></li>
          <li className='text-white'><Link href="/contact">Contacts</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
