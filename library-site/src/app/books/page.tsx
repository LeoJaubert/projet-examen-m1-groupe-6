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

  function compareSort(s1: bookSortType, s2: bookSortType): boolean {
    if (s1.direction !== s2.direction) return false;
    if (s1.field !== s2.field) return false;
    return true;
  }

  const removeGenre = (type: string): void => {
    setFilterGenres(filterGenres.filter((filterType) => filterType !== type));
  };

  // Code pour le tri
  const [bookSort, setBookSort] = useState<bookSortType>({
    field: 'id',
    direction: 'asc',
  });

  const bookSorts: bookSortType[] = [
    { field: 'id', direction: 'asc' },
    { field: 'id', direction: 'desc' },
    { field: 'name', direction: 'asc' },
    { field: 'name', direction: 'desc' },
    { field: 'authorID', direction: 'asc' },
    { field: 'authorID', direction: 'desc' },
    { field: 'authorFirstName', direction: 'asc' },
    { field: 'authorFirstName', direction: 'desc' },
    { field: 'authorLastName', direction: 'asc' },
    { field: 'authorLastName', direction: 'desc' },
  ];

  const { useListBooks } = useBooksProviders();
  const { books, load } = useListBooks({ search, filterGenres, bookSort });

  useEffect(() => load, [load]);

  useEffect(() => {
    document.title = 'Liste des livres';
  }, []);

  return (
    <>
      <main>
        <MenuHamburger />
        <AddBook />
      </main>
      <input
        type="text"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          e.preventDefault();
          setSearch(e.target.value);
        }}
      />
      {bookSorts.map((currentSort) => (
        <button
          key={currentSort.field + currentSort.direction}
          type="button"
          onClick={(): void => setBookSort(currentSort)}
          disabled={compareSort(currentSort, bookSort)}
        >
          {`${currentSort.field} ${currentSort.direction}`}
        </button>
      ))}
      <br />
      <select onChange={onSelectGenre}>
        {nomsGenres.map((genre) => (
          <option value={genre}>{genre}</option>
        ))}
      </select>
      <button type="button" onClick={addGenre}>
        Add filter
      </button>
      <br />
      {nomsGenres.map((type) => (
        <button type="button" onClick={(): void => removeGenre(type)}>
          {type}
          {'           '}
        </button>
      ))}
      <h1>Books</h1>
      {books.map((book) => (
        <div key={book.id}>
          {`Titre: ${book.name}, auteur: ${book.author.firstName} ${book.author.lastName}, genres: ${book.genres}`}
        </div>
      ))}
    </>
  );
};

export default BooksPage;
