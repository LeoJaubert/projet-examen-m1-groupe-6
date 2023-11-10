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
    <main>
      <p className="text-lg font-semibold">
        {`${user?.firstname} ${user?.lastname}`}
      </p>

      {user?.books.map((book) => <p>{`${book}`}</p>)}
    </main>
  );
};

export default UserDetailsPage;
