import {Service} from 'typedi';
import _ from 'lodash';
import {v4 as uuid} from 'uuid'
import UsersRepository from './users.repository';
import {ValidationError} from "class-validator";

@Service()
export default class UsersService {

  constructor(
    private readonly usersRepository: UsersRepository
  ) {}

  public getAllUsers(): any[] {
    return this.usersRepository.getAllUsers();
  }

  public assign(userId: any, {id:universityId}: any): any[] {
    const users = this.usersRepository.getAllUsers();
    const user = users.find(({id}: any) => id === userId);
    if (!user) {
      throw new ValidationError();
    }
    user.university = universityId;
    return this.usersRepository.saveAllUsers(users);
  }

  public createUser(user: any): any {
    const users = this.usersRepository.getAllUsers();
    if (users.find(({email}: any) => {
      return email === user.email;
    })) {
      throw new Error('User already exist!');
    }
    user.id = uuid();
    return this.usersRepository.addUser(user);
  }

  public updateUser(id: string, user: any): any[] {
    const users = this.usersRepository.getAllUsers();
    // Find by id
    const db_user = users.find(({id: db_id}: any): any => id === db_id);
    if (!db_user) {
      throw new Error('User not found');
    }
    users[users.indexOf(db_user)] = {...user, 'id': id};
    // Update
    return this.usersRepository.saveAllUsers(users);
  }

  public deleteUser(id: string): any {
    const users = this.usersRepository.getAllUsers();
    // Find by id and delete
    const db_user = _.remove(users, ({id: db_id}: any): any => id === db_id);
    if (!db_user) {
      throw new Error('User not found');
    }
    return this.usersRepository.saveAllUsers(users);
  }

}