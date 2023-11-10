'use client';

import axios from 'axios';
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
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');

  const handlefirstnameChange = (event) => {
    setfirstname(event.target.value);
  };

  const handlelastnameChange = (event) => {
    setlastname(event.target.value);
  };

  const handleSubmit = async () => {
    const newUser = {
      firstname,
      lastname,
    };

    const response = await axios.post('http://localhost:3001/user', newUser);
    closeModal
  };

  return (
    <div className="add-global">
      <button
        id="adduser-button"
        className="block text-noir bg-bleu border-2 hover:bg-bleu border-noir focus:outline-none focus:ring-noir font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
        onClick={openModal}
      >
        Ajouter un utilisateur
      </button>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onCancel={closeModal}
          onChange={(handlefirstnameChange, handlelastnameChange)}
          onSubmit={handleSubmit}
          title="Ajouter un utilisateur"
        >
          <div className={styles.form}>
            <div className={styles.formPart}>
              <p className={styles.label}>Prénom</p>
              <input className={styles.input} 
                value={firstname}
                onChange={handlefirstnameChange}
              />
            </div>
            <div className={styles.formPart}>
              <p className={styles.label}>Nom de famille</p>
              <input
                className={styles.input}
                value={lastname}
                onChange={handlelastnameChange}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export const AddBook: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setname] = useState('');
  const [author, setauthor] = useState('');
  const [writtenOn, setwrittenOn] = useState('');
  const [genre, setgenre] = useState('');

  const handlenameChange = (event) => {
    setname(event.target.value);
  };

  const handleauthorChange = (event) => {
    setauthor(event.target.value);
  };

  const handlewrittenOnChange = (event) => {
    setwrittenOn(event.target.value);
  };

  const handlegenreChange = (event) => {
    setgenre(event.target.value);
  };

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    const [authorFirstName, authorLastName] = author.split(' ');

    const newBook = {
      name,
      author: {
        firstName: authorFirstName,
        lastName: authorLastName,
      },
      writtenOn,
      genre,
    };

    const response = await axios.post('http://localhost:3001/books', newBook);
    closeModal();
  };

  return (
    <div className="add-global">
      <button
        id="addbook-button"
        className="block text-noir bg-bleu border-2 hover:bg-bleu border-noir focus:outline-none focus:ring-noir font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
        onClick={openModal}
      >
        Ajouter un livre
      </button>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onCancel={closeModal}
          onChange={
            (handlenameChange,
            handleauthorChange,
            handlewrittenOnChange,
            handlegenreChange)
          }
          onSubmit={handleSubmit}
          title="Ajouter un livre"
        >
          <div className={styles.form}>
            <div className={styles.formPart}>
              <p className={styles.label}>Nom du livre</p>
              <input
                className={styles.input}
                value={name}
                onChange={handlenameChange}
              />
            </div>
            <div className={styles.formPart}>
              <p className={styles.label}>Auteur</p>
              <input
                className={styles.input}
                value={author}
                onChange={handleauthorChange}
              />
            </div>
            <div className={styles.formPart}>
              <p className={styles.label}>Date d&apos;écriture</p>
              <input
                className={styles.input}
                value={writtenOn}
                onChange={handlewrittenOnChange}
              />
            </div>
            <div className={styles.formPart}>
              <p className={styles.label}>Genre</p>
              <input
                className={styles.input}
                value={genre}
                onChange={handlegenreChange}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export const AddAuthor: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };
const [firstName, setfirstName] = useState('');
const [lastName, setlastName] = useState('');
const [photoUrl, setphotoUrl] = useState('');

const handlefirstNameChange = (event) => {
  setfirstName(event.target.value);
};

const handlelastNameChange = (event) => {
  setlastName(event.target.value);
};

const handlephotoUrlChange = (event) => {
  setphotoUrl(event.target.value);
};

const handleSubmit = async () => {
  const newAuthor = {
    firstName,
    lastName,
    photoUrl,};
  

  const response = await axios.post('http://localhost:3001/authors', newAuthor);
    closeModal};
  return (
    <div className="add-global">
      <button
        id="addbook-button"
        className="block text-noir bg-bleu border-2 hover:bg-bleu border-noir focus:outline-none focus:ring-noir font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
        onClick={openModal}
      >
        Ajouter un auteur
      </button>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onCancel={closeModal}
          onChange={(handlefirstNameChange, handlelastNameChange, handlephotoUrlChange)}
          onSubmit={handleSubmit}
          title="Ajouter un auteur"
        >
          <div className={styles.form}>
            <div className={styles.formPart}>
              <p className={styles.label}>Prénom</p>
              <input className={styles.input}
              value={firstName}
              onChange={handlefirstNameChange} />
              
            </div>
            <div className={styles.form}>
            <div className={styles.formPart}>
              <p className={styles.label}>Nom de famille</p>
              <input className={styles.input} 
                value={lastName}
                onChange={handlelastNameChange}
              />
            </div>
            <div className={styles.formPart}>
              <p className={styles.label}>Url de la photo</p>
              <input
                className={styles.input}
                value={photoUrl}
                onChange={handlephotoUrlChange}
              />
            </div>
          </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
