'use client';

import { useParams } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useAuthorsProviders } from '@/hooks';

const AuthorDetailsPage: FC = () => {
  const { id } = useParams();

  const { useListAuthors } = useAuthorsProviders();
  const { authors, load } = useListAuthors();
  useEffect(() => load, [load]);

  const author = authors.find((elem) => elem.id === id);

  return (
    <main className="p-8">
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 right-4 bg-bleu px-4 py-2 rounded-md"
      >
        Supprimer l'auteur
      </button>
      <h1 className="text-3xl font-bold mb-4">Détails de l&apos;auteur</h1>

      {author && (
        <div className="bg-vertclair p-6 rounded-md shadow-md mb-8">
          <p className="text-lg font-semibold">
            {`${author.firstName} ${author.lastName}`}
          </p>

          {author.books.map((book) => (
            <div key={book.id} className="mt-4">
              <p className="text-lg font-semibold">Liste des livres écrits :</p>
              <p className="text-lg font-semibold">{book.name}</p>
              <a
                href={`http://localhost:3000/books/${book.id}`}
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

export default AuthorDetailsPage;
