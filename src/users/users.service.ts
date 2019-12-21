import { Service } from 'typedi';

import UsersRepository from './users.repository';

@Service()
export default class UsersService {

  constructor(private readonly usersRepository: UsersRepository) {}

  public getAllUsers(): any {
    return this.usersRepository.getAllUsers();
  }
}