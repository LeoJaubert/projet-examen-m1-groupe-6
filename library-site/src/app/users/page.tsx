'use client';

import { FC, useEffect } from 'react';
import { MenuHamburger } from '../layout';

const UsersPage: FC = () => {
  useEffect(() => {
    document.title = 'Liste des utilisateurs';
  }, []);

  return (
    <main>
      <MenuHamburger />
    </main>
  );
};

export default UsersPage;
