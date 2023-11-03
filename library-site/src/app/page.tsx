'use client';

import { FC, ReactElement, useEffect } from 'react';
import './globals.css';
import { MenuHamburger } from './layout';

const Home: FC = (): ReactElement => {
  useEffect(() => {
    document.title = 'Accueil';
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Home page
      <MenuHamburger />
    </main>
  );
};

export default Home;
