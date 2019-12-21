import { Service } from 'typedi';

import { UsersService } from '../../users';

@Service()
export default class UsersOrchestrator {

  constructor(private readonly usersService: UsersService) {}

  public getAllUsers(): any {
    return this.usersService.getAllUsers();
  }
}