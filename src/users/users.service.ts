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
    const users = this.usersRepository.getAllUsers();
    if (users.find(({email}) => {
      return email === user.email;
    })) {
      return null
    }
    return this.usersRepository.addUser(user);
  }

  public patchUser(id: number, user: any): any {
    // TODO Validate
    const users = this.usersRepository.getAllUsers();
    // Find by id
    const db_user = users.find(({id: db_id}) => {
      return id == db_id
    });
    if (!db_user) {
      return null
    }
    users[users.indexOf(db_user)] = {...user, 'id': id};
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