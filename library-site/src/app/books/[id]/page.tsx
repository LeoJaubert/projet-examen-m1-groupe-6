'use client';

import { useParams } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useBooksProviders, useUsersProviders } from '@/hooks';

const BooksDetailsPage: FC = () => {
  const { id } = useParams();

  const { useListBooks } = useBooksProviders();
  const { books, loadBooks } = useListBooks();
  useEffect(() => loadBooks, [loadBooks]);

  const book = books.find((elem) => elem.id === id);

  // Filtre par nom de livre
  const { useListUsers } = useUsersProviders();
  const { users, load } = useListUsers();
  useEffect(() => load, [load]);

  const usersWithBook = users.filter((user) => {
    if (!book?.name) return true;
    return user.books.some((titre) => titre === book.name);
  });

  return (
    <main>
      <h1>Livre</h1>
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
      {usersWithBook.map((user) => (
        <div key={user.id}>
          <p>{`${user.firstname} ${user.lastname}`}</p>
          <a href={`http://localhost:3000/users/${user.id}`}>Details</a>
        </div>
      ))}
    </main>
  );
};

export default BooksDetailsPage;
