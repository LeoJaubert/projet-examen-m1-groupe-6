'use client';

import { useParams } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useUsersProviders } from '@/hooks';

const UserDetailsPage: FC = () => {
  const { id } = useParams();

  const { useListUsers } = useUsersProviders();
  const { users, load } = useListUsers();
  useEffect(() => load, [load]);

  const user = users.find((elem) => elem.id === id);

  return (
    <main className="p-8">
            <button
        onClick={() => window.history.back()}
        className="absolute top-4 right-4 bg-bleu px-4 py-2 rounded-md"
      >
        Supprimer l'utilisateur
      </button>
      <h1 className="text-3xl font-bold mb-4">Détails de l&apos;utilisateur</h1>

      {user && (
        <div className="bg-vertclair p-6 rounded-md shadow-md mb-8">
          <p className="text-lg font-semibold">
            {`${user.firstname} ${user.lastname}`}
          </p>

          {user.books.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Livres possédés :</h2>
              {user.books.map((book, index) => (
                <div key={index} className="mb-2">
                  <p>{book}</p>
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
        </div>
      )}
    </main>
  );
};

export default UserDetailsPage;
