'use client';

import { FC, useEffect } from 'react';
import { useUsersProviders } from '@/hooks';
import { MenuHamburger, AddUser } from '../layout';

const UsersPage: FC = () => {
  const { useListUsers } = useUsersProviders();
  const { users, load } = useListUsers();

  useEffect(() => load, [load]);
  useEffect(() => {
    document.title = 'Liste des utilisateurs';
  }, []);

  return (
    <main>
      <MenuHamburger />
      <AddUser />
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          {user.firstname} {user.lastname}
        </div>
      ))}
    </main>
  );
};

export default UsersPage;
