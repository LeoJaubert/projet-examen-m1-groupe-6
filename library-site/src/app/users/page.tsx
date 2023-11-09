'use client';

import React, { FC, useState, useEffect } from 'react';
import { useUsersProviders } from '@/hooks';
import { MenuHamburger, AddUser } from '../layout';

const UsersPage: FC = () => {
  // Filtre par nom de livre
  const [search, setSearch] = useState('');

  const { useListUsers } = useUsersProviders();
  const { users, load } = useListUsers({ search });

  useEffect(() => load, [load]);
  useEffect(() => {
    document.title = 'Liste des utilisateurs';
  }, []);

  return (
    <main>
      <MenuHamburger />
      <AddUser />
      <input
        type="text"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          e.preventDefault();
          setSearch(e.target.value);
        }}
      />
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          {`${user.firstname} 
          ${user.lastname}`}
        </div>
      ))}
    </main>
  );
};

export default UsersPage;
