import axios from 'axios';
import { useState } from 'react';
import { PlainBookModel } from '@/models';
import { Console } from 'console';

type UseListBooksProvider = 
{
  books: PlainBookModel[];
  load: () => void;
};

type ListBooksInput = 
{
  search?: string
}

export const useListBooks = (input?: ListBooksInput): UseListBooksProvider => 
{
  const [books, setBooks] = useState<PlainBookModel[]>([]);

  const fetchBooks = (): void => 
  {  
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books`)
      .then((data) => setBooks((data.data as PlainBookModel[])
      .filter((book) => (input?.search ? book.name.toLowerCase().includes(input.search.toLowerCase()) : true))))
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
