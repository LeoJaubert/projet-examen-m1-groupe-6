'use client';

import { FC, ReactElement, useEffect, useState } from 'react';
import { useBooksProviders, useGenresProviders } from '@/hooks';
import { MenuHamburger, AddBook } from '../layout';
import { bookSort } from './bookSort';

const BooksPage: FC = (): ReactElement => {
  // Permet d'avoir tous les noms des genres pour le filtrage.
  const { useListGenres } = useGenresProviders();
  const { genres, load_genre } = useListGenres();
  useEffect(() => load_genre, [load_genre]);
  const nomsGenres = genres
    .map((genre) => genre.name)
    .filter((value, index, array) => array.indexOf(value) === index);

  // Filtre par nom de livre
  const [search, setSearch] = useState('');

  // Code pour le filtre par genre
  const [filterGenres, setFilterGenres] = useState<string[]>([]);

  const [genreSelect, setGenreSelect] = useState<string>(nomsGenres[0]);

  const onSelectGenre = (e: any): void => {
    e.preventDefault();

    setGenreSelect(e.target.value);
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
  const [bookSort, setBookSort] = useState<bookSort>({
    field: 'id',
    direction: 'asc',
  });

  const bookSorts: bookSort[] = [
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

  const { useListBooks } = useBooksProviders({
    search,
    filterGenres,
    bookSort,
  });
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
        onChange={(e: any) => {
          e.preventDefault();
          setSearch(e.target.value);
        }}
      />
      {bookSorts.map((currentSort) => (
        <button
          key={currentSort.field + currentSort.direction}
          type="button"
          onClick={() => setBookSort(currentSort)}
          disabled={
            bookSort.direction === currentSort.direction
            && bookSort.field === currentSort.field
          }
        >
          {currentSort.field}
          {' '}
          {currentSort.direction}
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
        <button type="button" onClick={() => removeGenre(type)}>
          {type}
          {'           '}
        </button>
      ))}
      <h1>Books</h1>
      {books.map((book) => (
        <div key={book.id}>
          Titre:
          {book.name}
, auteur:
          {book.author.firstName} {book.author.lastName}
          genres:
          {book.genres}
        </div>
      ))}
      <div>
        {bookSort.field} {bookSort.direction}
      </div>
    </>
  );
};

export default BooksPage;
