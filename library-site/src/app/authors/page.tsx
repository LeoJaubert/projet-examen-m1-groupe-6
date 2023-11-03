'use client';

import { FC, useEffect } from 'react';
import { MenuHamburger } from '../layout';

const AuthorsPage: FC = () => {
  useEffect(() => {
    document.title = 'Liste des auteurs';
  }, []);

  return (
    <main>
      <MenuHamburger />
    </main>
  );
};

export default AuthorsPage;
