import { UserModel, PlainUserModel } from 'library-api/src/models';
import { CreateUserRepositoryInput } from 'library-api/src/repositories/user/user.repository.type';

export type PlainUserUseCasesOutput = PlainUserModel;
export type UserUseCasesOutput = UserModel;
export type CreateUserUseCasesInput = CreateUserRepositoryInput;