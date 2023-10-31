import { User } from 'library-api/src/entities';
import {
    UserRepositoryOutput,
    PlainUserRepositoryOutput,
} from 'library-api/src/repositories/user/user.repository.type';

export const adaptUserEntityToPlainUserModel = (
    user : User,
): PlainUserRepositoryOutput => ({
  ...user,
});

export const adaptUserEntityToUserModel = (
    user: User
): UserRepositoryOutput => ({
    ...user
});