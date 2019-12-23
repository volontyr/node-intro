import {Service} from 'typedi';

import UsersRepository from './users.repository';

@Service()
export default class UsersService {

  constructor(private readonly usersRepository: UsersRepository) {
  }

  public getAllUsers(): any {
    return this.usersRepository.getAllUsers();
  }

  public postUser(user: any): any {
    // TODO Validate
    return this.usersRepository.addUser(user);
  }

  public patchUser(id: number, user: any): any {
    // TODO Validate
    const users = this.usersRepository.getAllUsers();
    // Find by id
    // Update
    return this.usersRepository.saveAllUsers(users);
  }

  public deleteUser(id: number): any {
    const users = this.usersRepository.getAllUsers();
    // Find by id
    // delete user
    return this.usersRepository.saveAllUsers(users);
  }

}