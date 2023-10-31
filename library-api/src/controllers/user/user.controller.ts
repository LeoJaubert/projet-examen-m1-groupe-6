import { Controller, Get, Param } from '@nestjs/common';
import {
  UserPresenter,
  PlainUserPresenter,
} from 'library-api/src/controllers/user/user.presenter';
import { UserId } from 'library-api/src/entities';
import { UserUseCases } from 'library-api/src/useCases';

@Controller('user')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainUserPresenter[]> {
    const user = await this.userUseCases.getAllPlain();

    return user.map(PlainUserPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: UserId): Promise<UserPresenter> {
    const users = await this.userUseCases.getById(id);

    return UserPresenter.from(users);
  }
}
