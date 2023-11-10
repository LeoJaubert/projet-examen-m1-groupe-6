'use client';

import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useBooksProviders, useGenresProviders } from '@/hooks';
import { MenuHamburger, AddBook } from '../layout';
import { bookSortType } from './bookSort';

const BooksPage: FC = (): ReactElement => {
  // Permet d'avoir tous les noms des genres pour le filtrage.
  const { useListGenres } = useGenresProviders();
  const { genres, loadGenre } = useListGenres();
  useEffect(() => loadGenre, [loadGenre]);
  const nomsGenres = genres
    .map((genre) => genre.name)
    .filter((value, index, array) => array.indexOf(value) === index);

  // Filtre par nom de livre
  const [search, setSearch] = useState('');

  // Code pour le filtre par genre
  const [filterGenres, setFilterGenres] = useState<string[]>([]);

  const [genreSelect, setGenreSelect] = useState<string>(nomsGenres[0]);

  const onSelectGenre = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    event.preventDefault();

    setGenreSelect(event.target.value);
  };

  const addGenre = (): void => {
    if (genreSelect) {
      setFilterGenres(
        [...filterGenres, genreSelect].filter(
          (value, index, array) => array.indexOf(value) === index,
        ),
      );
    }
  };

  const removeGenre = (type: string): void => {
    setFilterGenres(filterGenres.filter((filterType) => filterType !== type));
  };

  // Code pour le tri
  const [bookSort, setBookSort] = useState<bookSortType>({
    field: 'Nom:',
    direction: 'A->Z',
  });

  const bookSorts: bookSortType[] = [
    { field: 'Nom:', direction: 'A->Z' },
    { field: 'Nom:', direction: 'Z->A' },
    { field: 'Prénom auteur:', direction: 'A->Z' },
    { field: 'Prénom auteur:', direction: 'Z->A' },
    { field: 'Nom auteur:', direction: 'A->Z' },
    { field: 'Nom auteur:', direction: 'Z->A' },
  ];

  function compareSort(s1: bookSortType, s2: bookSortType): boolean {
    if (s1.direction !== s2.direction) return false;
    if (s1.field !== s2.field) return false;
    return true;
  }

  const { useListBooks } = useBooksProviders();
  const { books, loadBooks } = useListBooks({ search, filterGenres, bookSort });

  useEffect(() => loadBooks, [loadBooks]);

  useEffect(() => {
    document.title = 'Liste des livres';
  }, []);

  return (
    <main>
      <div className="flex justify-between items-center text-white p-4">
        <MenuHamburger />
        <AddBook />
      </div>
      <div className="p-4 space-x-4">
        <input
          type="text"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            e.preventDefault();
            setSearch(e.target.value);
          }}
          placeholder="Rechercher un livre"
          className="p-2 border border-gray-300 rounded-md"
        />
        <select
          onChange={onSelectGenre}
          className="p-2 border border-gray-300 rounded-md ml-4"
        >
          {nomsGenres.map((genre) => (
            <option value={genre} key={genre}>
              {genre}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={addGenre}
          className="bg-bleu text-black px-4 py-2 rounded-md ml-2 border-2 border-noir font-medium"
        >
          Filtrer
        </button>
        <div className="mt-4 space-x-2">
          {filterGenres.map((type) => (
            <button
              key={type}
              onClick={(): void => removeGenre(type)}
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full"
              type="button"
            >
              {`${type} `}
              <span className="text-xs">X</span>
            </button>
          ))}
        </div>
        {bookSorts.map((currentSort) => (
          <button
            key={currentSort.field + currentSort.direction}
            type="button"
            onClick={(): void => setBookSort(currentSort)}
            disabled={compareSort(currentSort, bookSort)}
            className={`bg-gray-300 text-gray-700 px-3 py-1 rounded-md mt-4 ${
              compareSort(currentSort, bookSort)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            {`${currentSort.field} ${currentSort.direction}`}
          </button>
        ))}
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Livres :</h1>
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-vertclair p-4 rounded-md shadow-md mb-4"
          >
            <p>
              <strong>Titre:</strong>
              {` ${book.name} `}
              <br />
              <strong>Auteur:</strong>
              {` ${book.author.firstName} ${book.author.lastName} `}
              <br />
              <strong>Genre(s):</strong>
              {` ${book.genres.join(', ')}`}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default BooksPage;
