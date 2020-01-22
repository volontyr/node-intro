import * as fs from 'fs';
import {Service} from 'typedi';

import { DB_FILE } from '../constants';

@Service()
export default class UsersRepository {

  public getAllUsers(): any {
    const usersString = fs.readFileSync(process.env.DB_PATH || DB_FILE || DB_FILE, {
      encoding: 'utf8'
    });
    return JSON.parse(usersString).users;
  }
  public saveAllUsers(users:any): any {
    const dbStoreString = fs.readFileSync(process.env.DB_PATH || DB_FILE, {
      encoding: 'utf8'
    });
    const dbStore = JSON.parse(dbStoreString);
    dbStore.users = users;
    fs.writeFileSync(process.env.DB_PATH || DB_FILE, JSON.stringify(dbStore), {
      encoding: 'utf8'
    });
    return users;
  }
 public addUser(user:any): any {
   const dbStoreString = fs.readFileSync(process.env.DB_PATH || DB_FILE, {
     encoding: 'utf8'
   });
   const dbStore = JSON.parse(dbStoreString);
   dbStore.users.push(user);
   fs.writeFileSync(process.env.DB_PATH || DB_FILE, JSON.stringify(dbStore), {
     encoding: 'utf8'
   });
   return user;
 }

}