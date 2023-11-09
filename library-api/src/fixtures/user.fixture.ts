import { faker } from '@faker-js/faker';
import { User, UserId } from '../entities';

export const userFixture = (): User => ({
    id: faker.string.uuid() as UserId,
    firstname: faker.string.sample(8),
    lastname: faker.string.sample(8),
  }) as User;
