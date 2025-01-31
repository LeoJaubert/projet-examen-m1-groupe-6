import { PlainUserModel, UserModel } from 'library-api/src/models/user.model';

export type PlainUserRepositoryOutput = PlainUserModel;
export type UserRepositoryOutput = UserModel;
export type CreateUserRepositoryInput = Omit<PlainUserModel, 'id'>;
