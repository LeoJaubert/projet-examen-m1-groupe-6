'use client';

import React, { FC, useState, useEffect } from 'react';
import { useAuthorsProviders } from '@/hooks';
import { MenuHamburger, AddAuthor } from '../layout';

const AuthorsPage: FC = () => {
  const [search, setSearch] = useState('');

  const { useListAuthors } = useAuthorsProviders();
  const { authors, load } = useListAuthors({ search });

  useEffect(() => load, [load]);

  useEffect(() => {
    document.title = 'Liste des auteurs';
  }, []);

  return (
    <main className="p-4">
      <MenuHamburger />
      <AddAuthor />
      <div className="mt-10">
        <input
          type="text"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setSearch(e.target.value);
          }}
          placeholder="Rechercher un auteur"
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>
      <h1 className="text-2xl font-bold mt-8 mb-4">Auteurs :</h1>
      <div className="grid grid-cols-1 gap-4">
        {authors.map((author) => (
          <div
            key={author.id}
            className="bg-vertclair p-4 rounded-md shadow-md"
          >
            <p className="text-lg font-semibold">
              {`${author.firstName} ${author.lastName}`}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AuthorsPage;
