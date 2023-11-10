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
    <main className="p-8">
      <button
        onClick={(): void => window.history.back()}
        className="absolute top-4 right-4 bg-bleu px-4 py-2 rounded-md"
        type="button"
      >
        Supprimer le livre
      </button>
      <h1 className="text-3xl font-bold mb-4">Détails du livre</h1>

      {book && (
        <div className="bg-vertclair p-6 rounded-md shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Informations sur le livre
          </h2>
          <p>
            <strong>Titre:</strong>
            {` ${book.name} `}
            <br />
            <strong>Auteur:</strong>
            {` ${book.author.firstName} ${book.author.lastName} `}
            <br />
            <strong>Genre(s):</strong>
            {` ${book.genres.join(', ')}`}
            <br />
            <strong>Date d&apos;écriture:</strong>
            {` ${book.writtenOn}`}
          </p>
        </div>
      )}

      {usersWithBook.length > 0 && (
        <div className="bg-vertclair p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Utilisateurs possédant ce livre :
          </h2>
          {usersWithBook.map((user) => (
            <div key={user.id} className="mb-4">
              <p>{`${user.firstname} ${user.lastname}`}</p>
              <a
                href={`http://localhost:3000/users/${user.id}`}
                className="underline"
              >
                Détails
              </a>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default BooksDetailsPage;
