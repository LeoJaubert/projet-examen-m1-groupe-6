'use client';

import { useParams } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useBooksProviders } from '@/hooks';

const BooksDetailsPage: FC = () => {
  const { id } = useParams();

  const { useListBooks } = useBooksProviders();
  const { books, loadBooks } = useListBooks();

  useEffect(() => loadBooks, [loadBooks]);

  const book = books.find((elem) => elem.id === id);

  return (
    <main>
      <h1>Auteur</h1>
      <p>{`${book?.author.firstName} ${book?.author.lastName}`}</p>
      <h2>Livre</h2>
      <p>
        <strong>Titre:</strong>
        {` ${book?.name} `}
        <br />
        <strong>Auteur:</strong>
        {` ${book?.author.firstName} ${book?.author.lastName} `}
        <br />
        <strong>Genre(s):</strong>
        {` ${book?.genres.join(', ')}`}
        <br />
        <strong>Date d&apos;écriture:</strong>
        {` ${book?.writtenOn}`}
      </p>
    </main>
  );
};

export default BooksDetailsPage;
