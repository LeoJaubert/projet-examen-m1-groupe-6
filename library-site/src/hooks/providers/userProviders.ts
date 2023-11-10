import axios from 'axios';
import { useState } from 'react';
import { PlainUserModel } from '@/models';

type UseListUsersProvider = {
  users: PlainUserModel[];
  load: () => void;
};

type ListUsersInput = {
  search?: string;
  filterTitres?: string[];
};

export const useListUsers = (input?: ListUsersInput): UseListUsersProvider => {
  const [users, setUsers] = useState<PlainUserModel[]>([]);

  function setAxiosData(userData: PlainUserModel[]): void {
    const filteredUserData0 = userData.filter((user) => {
      if (!input?.search) return true;
      return user.lastname.toLowerCase().includes(input.search.toLowerCase());
    });

    const filteredUserData1 = filteredUserData0.filter((user) => {
      if (!input?.filterTitres?.length) return true;
      return user.books.some((genre) => input.filterTitres?.includes(genre));
    });

    setUsers(filteredUserData1);
  }

  const fetchUsers = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user`)
      .then((data) => setAxiosData(data.data as PlainUserModel[]))
      .catch((err) => console.error(err));
  };

  return { users, load: fetchUsers };
};

type UsersProviders = {
  useListUsers: (input?: ListUsersInput) => UseListUsersProvider;
};

export const useUsersProviders = (): UsersProviders => ({
  useListUsers,
});
