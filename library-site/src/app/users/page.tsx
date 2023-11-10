'use client';

import React, { FC, useState, useEffect } from 'react';
import { useUsersProviders, useBooksProviders } from '@/hooks';
import { MenuHamburger, AddUser } from '../layout';

const UsersPage: FC = () => {
  // Filtre des utilisateurs par livre possédé
  const { useListBooks } = useBooksProviders();
  const { books, loadBooks } = useListBooks();
  useEffect(() => loadBooks, [loadBooks]);
  const titresLivres = books
    .map((book) => book.name)
    .filter((value, index, array) => array.indexOf(value) === index);

  // Code pour le filtre par genre
  const [filterTitres, setFilterTitres] = useState<string[]>([]);

  const [genreSelect, setGenreSelect] = useState<string>(titresLivres[0]);

  const onSelectTitre = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    event.preventDefault();

    setGenreSelect(event.target.value);
  };

  const addTitre = (): void => {
    if (genreSelect) {
      setFilterTitres(
        [...filterTitres, genreSelect].filter(
          (value, index, array) => array.indexOf(value) === index,
        ),
      );
    }
  };

  const removeTitre = (type: string): void => {
    setFilterTitres(filterTitres.filter((filterType) => filterType !== type));
  };

  // Filtre par nom de livre
  const [search, setSearch] = useState('');

  const { useListUsers } = useUsersProviders();
  const { users, load } = useListUsers({ search, filterTitres });

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
        <select
          onChange={onSelectTitre}
          className="p-2 border border-gray-300 rounded-md ml-4"
        >
          {titresLivres.map((titre) => (
            <option value={titre} key={titre}>
              {titre}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={addTitre}
          className="bg-bleu text-black px-4 py-2 rounded-md ml-2 border-2 border-noir font-medium"
        >
          Filtrer
        </button>
        <div className="mt-4 space-x-2">
          {filterTitres.map((titre) => (
            <button
              key={titre}
              onClick={(): void => removeTitre(titre)}
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full"
              type="button"
            >
              {`${titre} `}
              <span className="text-xs">X</span>
            </button>
          ))}
        </div>
      </div>
      <h1 className="text-2xl font-bold mt-8 mb-4">Utilisateurs :</h1>
      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-vertclair p-4 rounded-md shadow-md">
            <p className="text-lg font-semibold">
              {`${user.firstname} ${user.lastname}`}
            </p>
            <a href={`http://localhost:3000/users/${user.id}`}
              className="underline">Détails
            </a>
          </div>
        ))}
      </div>
    </main>
  );
};

export default UsersPage;
