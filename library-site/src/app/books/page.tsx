'use client';

import { FC, ReactElement, useEffect, useState } from 'react';
import { useBooksProviders, useGenresProviders } from '@/hooks';
import { MenuHamburger } from '../layout';

const BooksPage: FC = (): ReactElement => 
{
  // Permet d'avoir tous les noms des genres pour le filtrage.
  const { useListGenres } = useGenresProviders();
  const { genres, load_genre } = useListGenres();
  useEffect(() => load_genre, [load_genre]);
  const nomsGenres = genres.map((genre) => genre.name).filter((value, index, array) => array.indexOf(value) === index);

  // Filtre par nom de livre
  const [search, setSearch] = useState('');

  // Code pour le filtre par genre
  const [filterGenres, setFilterGenres] = useState<string[]>([]);

  const [genreSelect, setGenreSelect] = useState<string>(nomsGenres[0]);

  const onSelectGenre = (e: any) => {
    e.preventDefault();

    setGenreSelect(e.target.value);
  };

  const addGenre = () => {
    if (genreSelect) {
      setFilterGenres([...filterGenres, genreSelect].filter((value, index, array) => array.indexOf(value) === index));
    }
  };

  const removeGenre = (type: string) => {
    setFilterGenres(filterGenres.filter((filterType) => filterType !== type));
  };

  const { useListBooks } = useBooksProviders({ search, filterGenres });
  const { books, load } = useListBooks({ search, filterGenres });

  useEffect(() => load, [load]);

  useEffect(() => {
    document.title = 'Liste des livres';
  }, []);

  return (
    <>
      <main>     
        <MenuHamburger />
      </main>
      <input type="text" value={search} onChange={(e: any) => { e.preventDefault(); setSearch(e.target.value); }} />
      <br />
      <select onChange={onSelectGenre}>
        {nomsGenres.map((genre) => <option value={genre}>{genre}</option>)}
      </select>
      <button type="button" onClick={addGenre}>Add filter</button>
      <br />
      {nomsGenres.map((type) => (
        <button type="button" onClick={() => removeGenre(type)}>{type}{'           '}</button>
      ))}
      <h1>Books</h1>
      {books.map((book) => (
        <div key={book.id}>Titre: {book.name}, auteur: {book.author.firstName} {book.author.lastName}, genres: {book.genres}</div>
      ))}
    </>
  );
};

export default BooksPage;
