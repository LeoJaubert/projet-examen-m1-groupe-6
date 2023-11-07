import axios from 'axios';
import { useState } from 'react';
import { PlainBookModel } from '@/models';
import { bookSortType } from '@/app/books/bookSort';

type UseListBooksProvider = {
  books: PlainBookModel[];
  load: () => void;
};

type ListBooksInput = {
  search?: string;
  filterGenres?: string[];
  bookSort?: bookSortType;
};

export const useListBooks = (input?: ListBooksInput): UseListBooksProvider => {
  const [books, setBooks] = useState<PlainBookModel[]>([]);

  function setAxiosData(bookData: PlainBookModel[]): void {
    const sortedBookData = bookData.sort((b1, b2) => {
      let val1;
      let val2;

      switch (input?.bookSort?.field) {
        case 'id':
          val1 = b1.id;
          val2 = b2.id;
          break;

        case 'name':
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

      if (input?.bookSort?.direction === 'asc') {
        return val1.localeCompare(val2);
      }

      return val2.localeCompare(val1);
    });

    const filteredBookData0 = sortedBookData.filter((book) => {
      if (!input?.search) return true;
      return book.name.toLowerCase().includes(input.search.toLowerCase());
    });

    const filteredBookData1 = filteredBookData0.filter((book) => {
      if (!input?.filterGenres?.length) return true;
      return book.genres.some((genre) => input.filterGenres?.includes(genre));
    });

    setBooks(filteredBookData1);
  }

  const fetchBooks = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books`)
      .then((data) => setAxiosData(data.data as PlainBookModel[]));
  };

  return { books, load: fetchBooks };
};

type BookProviders = {
  useListBooks: (input?: ListBooksInput) => UseListBooksProvider;
};

export const useBooksProviders = (): BookProviders => ({
  useListBooks,
});
