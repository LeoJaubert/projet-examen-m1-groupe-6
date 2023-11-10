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
    <main>
      <p className="text-lg font-semibold">
        {`${author?.firstName} ${author?.lastName}`}
      </p>

      {author?.books.map((book) => (
        <div key={book.id}>
          <p>{book.name}</p>
          <a href={`http://localhost:3000/books/${book.id}`}>Details</a>
        </div>
      ))}
    </main>
  );
};

export default AuthorDetailsPage;
