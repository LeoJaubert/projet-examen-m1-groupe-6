import axios from 'axios';
import { useState, useEffect } from 'react';
import { PlainBookModel } from '@/models';
import { bookSort } from '@/app/books/bookSort';
import { useGenresProviders } from '@/hooks';
import { Console } from 'console';

type UseListBooksProvider = 
{
  books: PlainBookModel[];
  load: () => void;
};

type ListBooksInput = 
{
  search?: string;
  filterGenres?: string[];
  bookSort ?: bookSort;
}

export const useListBooks = (input?: ListBooksInput): UseListBooksProvider => 
{
  const [books, setBooks] = useState<PlainBookModel[]>([]);

  const fetchBooks = (): void => 
  {  
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books`)
      .then((data) => setBooks((data.data as PlainBookModel[])
      .sort((b1, b2) => {
        let val1;
        let val2;

        switch (input?.bookSort?.field)
        {
          case "id":
            val1 = b1.id;
            val2 = b2.id;
            break;

          case "name":
            val1 = b1.name;
            val2 = b2.name;
            break;

          case 'authorID':
            val1 = b1.author.id;
            val2 = b2.author.id;
            break;

          case 'authorFirstName':
            val1 = b1.author.firstName;
            val2 = b2.author.lastName;
            break;

          case 'authorLastName':
            val1 = b1.author.firstName;
            val2 = b2.author.lastName;
            break;

          default:
            return 0;
        }

        return input?.bookSort?.direction === 'asc' ? val1.localeCompare(val2) : val2.localeCompare(val1);
      })
      .filter((book) => (input?.search ? book.name.toLowerCase().includes(input.search.toLowerCase()) : true))
      .filter((book) => (input?.filterGenres?.length ? book.genres.some((genre) => input.filterGenres?.includes(genre)): true))))
      .catch((err) => console.error(err));
  };

  return { books, load: fetchBooks };
};

type BookProviders = {
  useListBooks: (input?: ListBooksInput) => UseListBooksProvider;
};

export const useBooksProviders = (input?: ListBooksInput): BookProviders => ({
  useListBooks,
});
