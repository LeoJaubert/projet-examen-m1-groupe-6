'use client';

import { FC, ReactElement, useEffect, useState } from 'react';
import { useBooksProviders } from '@/hooks';
import { MenuHamburger } from '../layout';

const BooksPage: FC = (): ReactElement => 
{
  const [search, setSearch] = useState('');
  const { useListBooks } = useBooksProviders({ search });
  const { books, load } = useListBooks({ search });

  useEffect(() => load, [load]);

  useEffect(() => {
    document.title = 'Liste des livres';
  }, []);

  return (
    <>
      <main>     
        <MenuHamburger />
      </main>
      <input type="text" value={search} onChange={(e: any) => { e.preventDefault(); setSearch(e.target.value); }} />
      <h1>Books</h1>
      {books.map((book) => (
        <div key={book.id}>Titre: {book.name}, auteur: {book.author.firstName} {book.author.lastName}, genres: {book.genres}</div>
      ))}
    </>
  );
};

export default BooksPage;
