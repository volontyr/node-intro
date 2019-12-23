import { Service } from 'typedi';

import { UsersService } from '../../users';

@Service()
export default class UsersOrchestrator {

  constructor(private readonly usersService: UsersService) {}

  public getAllUsers(): any {
    return this.usersService.getAllUsers();
  }

  public register(user: { email: string, name: string, surname: string, password: string }): any {
    const users = this.usersService.getAllUsers();
    return this.usersService.register(user, users);
  }
}