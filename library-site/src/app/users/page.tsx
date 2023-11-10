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
    <main className="p-4">
      <MenuHamburger />
      <AddUser />
      <div className="mt-10">
        <input
          type="text"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setSearch(e.target.value);
          }}
          placeholder="Rechercher un utilisateur"
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>
      <h1 className="text-2xl font-bold mt-8 mb-4">Utilisateurs :</h1>
      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-vertclair p-4 rounded-md shadow-md">
            <p className="text-lg font-semibold">
              {`${user.firstname} ${user.lastname}`}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default UsersPage;
