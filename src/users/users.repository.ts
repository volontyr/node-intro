import * as fs from 'fs';
import {Service} from 'typedi';

@Service()
export default class UsersRepository {

  public getAllUsers(): any {
    const usersString = fs.readFileSync(process.env.DB_PATH, {
      encoding: 'utf8'
    });
    return JSON.parse(usersString).users;
  }

  public register(user: Object): any {
    const dbStoreString = fs.readFileSync(process.env.DB_PATH, {
      encoding: 'utf8'
    });
    const dbStore = JSON.parse(dbStoreString);
    dbStore.users.push(user);
    fs.writeFileSync(process.env.DB_PATH, JSON.stringify(dbStore), {
      encoding: 'utf8'
    });
    return dbStore.users;
  }
}