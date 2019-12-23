import {Service} from 'typedi';

import {UsersService} from '../../users';

@Service()
export default class UsersOrchestrator {

  constructor(private readonly usersService: UsersService) {}

  public getAllUsers(): any {
    return this.usersService.getAllUsers();
  }

  public postUser(user: any): any {
    return this.usersService.postUser(user);
  }

  public patchUser(id: number, user: any): any {
    return this.usersService.patchUser(id, user);
  }

  public deleteUser(id: number): any {
    return this.usersService.deleteUser(id);
  }

}