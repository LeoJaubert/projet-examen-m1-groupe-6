import { faker } from '@faker-js/faker';
import { Book, BookId, AuthorId } from '../entities';

export const bookFixture = (): Book => ({
    id: faker.string.uuid() as BookId,
    name: faker.string.sample(8),
    author: {
      id: faker.string.uuid() as AuthorId,
    },
    writtenOn: faker.date,
  }) as unknown as Book;
