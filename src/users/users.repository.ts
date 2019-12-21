import * as fs from 'fs';
import { Service } from 'typedi';

@Service()
export default class UsersRepository {

  public getAllUsers(): any {
    const usersString = fs.readFileSync(process.env.DB_USERS, {
      encoding: 'utf8'
    });
    return JSON.parse(usersString).users;
  }
}