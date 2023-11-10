import axios from 'axios';
import { useState } from 'react';
import { PlainAuthorModel } from '@/models';

type UseListAuthorsProvider = {
  authors: PlainAuthorModel[];
  load: () => void;
};

type ListAuthorsInput = {
  search?: string;
  isFiltreOn?: boolean;
  filterNb?: number;
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

    const filteredAuthorData1 = filteredAuthorData0.filter((author) => {
      if (!input?.isFiltreOn) return true;
      return author.books.length === input?.filterNb;
    });
    setAuthors(filteredAuthorData1);
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
