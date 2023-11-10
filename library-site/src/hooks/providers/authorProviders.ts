import axios from 'axios';
import { useState } from 'react';
import { PlainAuthorModel } from '@/models';

type UseListAuthorsProvider = {
  authors: PlainAuthorModel[];
  load: () => void;
};

type ListAuthorsInput = {
  search?: string;
};

export const useListAuthors = (
  input?: ListAuthorsInput,
): UseListAuthorsProvider => {
  const [authors, setAuthors] = useState<PlainAuthorModel[]>([]);

  function setAxiosData(authorData: PlainAuthorModel[]): void {
    const filteredAuthorData0 = authorData.filter((author) => {
      if (!input?.search) return true;
      return author.lastName.toLowerCase().includes(input.search.toLowerCase());
    });

    setAuthors(filteredAuthorData0);
  }

  const fetchAuthors = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors`)
      .then((data) => setAxiosData(data.data as PlainAuthorModel[]))
      .catch((err) => console.error(err));
  };

  return { authors, load: fetchAuthors };
};

type AuthorsProviders = {
  useListAuthors: (input?: ListAuthorsInput) => UseListAuthorsProvider;
};

export const useAuthorsProviders = (): AuthorsProviders => ({
  useListAuthors,
});
