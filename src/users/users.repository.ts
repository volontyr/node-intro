import * as fs from 'fs';
import { Service } from 'typedi';

import { DB_FILE } from '../constants';

@Service()
export default class UsersRepository {

  public getAllUsers(): any {
    const usersString = fs.readFileSync(process.env.DB_USERS || DB_FILE, {
      encoding: 'utf8'
    });
    return JSON.parse(usersString).users;
  }
}