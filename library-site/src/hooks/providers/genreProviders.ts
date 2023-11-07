import axios from 'axios';
import { useState } from 'react';
import { PlainGenreModel } from '@/models';

type UseListGenresProvider = {
  genres: PlainGenreModel[];
  loadGenre: () => void;
};

export const useListGenres = (): UseListGenresProvider => {
  const [genres, setGenres] = useState<PlainGenreModel[]>([]);

  const fetchGenres = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/genres`)
      .then((data) => setGenres(data.data));
  };

  return { genres, loadGenre: fetchGenres };
};

type GenresProviders = {
  useListGenres: () => UseListGenresProvider;
};

export const useGenresProviders = (): GenresProviders => ({
  useListGenres,
});
