'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { ReactElement, ReactNode, useState } from 'react';
import * as React from 'react';
import Image from 'next/image';
import hamburgericon from './hamburgericon.ico';
import { Modal } from '../components/modals/Modal';
import styles from '../components/modals/modal.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export const MenuHamburger: React.FC = () => (
  <div className="menu">
    <button className="menu-button" id="menu-button" type="button">
      <Image src={hamburgericon} alt="Menu" width={40} height={40} />
    </button>
    <div className="menu-column" id="menu-column" style={{ display: 'none' }}>
      <a href="/" className="button-column">
        Accueil
      </a>
      <a href="/authors" className="button-column">
        Auteurs
      </a>
      <a href="/books" className="button-column">
        Livres
      </a>
      <a href="/users" className="button-column">
        Utilisateurs
      </a>
    </div>
    <script
      dangerouslySetInnerHTML={{
        __html: `
          document.getElementById('menu-button').addEventListener('click', function() {
            var menu = document.getElementById('menu-column');
            if (menu) {
              menu.style.display = (menu.style.display === 'none') ? 'block' : 'none';
            }
          });
        `,
      }}
    />
  </div>
);

export const AddUser: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div className="adduser-global">
      <button
        id="adduser-button"
        className="block text-noir bg-bleu border-2 hover:bg-bleu border-noir focus:outline-none focus:ring-noir font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={openModal}
      >
        Ajouter un utilisateur
      </button>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onCancel={closeModal}
          onSubmit={closeModal}
          title="Ajouter un utilisateur"
        >
          <div className={styles.form}>
            <div className={styles.formPart}>
              <p className={styles.label}>Prénom</p>
              <input className={styles.input} />
            </div>
            <div className={styles.formPart}>
              <p className={styles.label}>Nom de famille</p>
              <input className={styles.input} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
