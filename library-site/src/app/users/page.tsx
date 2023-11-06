'use client';

import { FC, useEffect } from 'react';
import { MenuHamburger, AddUser } from '../layout';

const UsersPage: FC = () => {
  useEffect(() => {
    document.title = 'Liste des utilisateurs';
  }, []);

  return (
    <main>
      <MenuHamburger />
      <AddUser />
    </main>
  );
};

export default UsersPage;
