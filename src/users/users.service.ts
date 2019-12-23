import _ from 'lodash';
import {Service} from 'typedi';

import UsersRepository from './users.repository';

@Service()
export default class UsersService {

  constructor(private readonly usersRepository: UsersRepository) {
  }

  public getAllUsers(): any {
    return this.usersRepository.getAllUsers();
  }

  public register(user: any, users:[any]): any {
    if (users.find(({email})=>{
      return email === user.email;
    })){
      return null
    }
    return this.usersRepository.register(user);
  }
}