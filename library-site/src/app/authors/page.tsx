'use client';

import { FC, useEffect } from 'react';
import { useAuthorsProviders } from '@/hooks';
import { MenuHamburger, AddAuthor } from '../layout';

const AuthorsPage: FC = () => {
  const { useListAuthors } = useAuthorsProviders();
  const { authors, load } = useListAuthors();

  useEffect(() => load, [load]);

  useEffect(() => {
    document.title = 'Liste des auteurs';
  }, []);

  return (
    <main>
      <MenuHamburger />
      <AddAuthor />
      <h1>Author</h1>
      {authors.map((author) => (
        <div key={author.id}>
          {author.firstName} {author.lastName}
        </div>
      ))}
    </main>
  );
};

export default AuthorsPage;
