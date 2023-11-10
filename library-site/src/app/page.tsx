'use client';

import { FC, ReactElement, useEffect } from 'react';
import './globals.css';
import { MenuHamburger } from './layout';

const Home: FC = (): ReactElement => {
  useEffect(() => {
    document.title = 'Accueil';
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-screen p-8 bg-gradient-to-b from-vertfonce to-bleu">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">
        Bibliothèque créée par :
      </h1>
      <div className="text-3xl font-semibold mb-6 text-left text-white space-y-8">
        <p>★ Julien Devos</p>
        <p>★ Léo Jaubert</p>
        <p>★ Pierre-Antoine Gilbert</p>
        <p>★ Saona Moussard</p>
      </div>
      <MenuHamburger />
    </main>
  );
};

export default Home;
