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
    <main>
      <MenuHamburger />
      <AddAuthor />
      <input
        type="text"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          setSearch(e.target.value);
        }}
        placeholder="Rechercher un auteur"
        className="p-2 border border-gray-300 rounded-md"
      />
      <h1>Author</h1>
      {authors.map((author) => (
        <div key={author.id}>
          {`${author.firstName} 
          ${author.lastName}`}
        </div>
      ))}
    </main>
  );
};

export default AuthorsPage;
