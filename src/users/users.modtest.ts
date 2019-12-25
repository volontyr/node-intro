import * as fs from 'fs';

import {Container} from 'typedi';
import UsersService from './users.service';
import * as path from "path";


const usersService = Container.get(UsersService);

describe('Users service tests', () => {
  const mockUser = {email: "test@test.com", name: "test", surname: "test", password: "123"};
  const MOCK_PATH = path.resolve(path.dirname(process.env.DB_PATH), 'mock_db.json');
  beforeAll(() => {
    const DB_MOCK = fs.readFileSync(process.env.DB_PATH, {encoding: 'utf8'});
    fs.writeFileSync(MOCK_PATH, DB_MOCK, {encoding: 'utf8'})
  });

  afterAll(() => {
    const DB_MOCK = fs.readFileSync(MOCK_PATH, {encoding: 'utf8'});
    fs.writeFileSync(process.env.DB_PATH, DB_MOCK, {encoding: 'utf8'});
    fs.unlinkSync(MOCK_PATH);
  });

  it('getAllUsers should return an array of user objects', async () => {
    const users = usersService.getAllUsers();

    users.sort(({email: a}: any, {email: b}: any) => a > b ? 1 : a < b ? -1 : 0);

    const [user1, user2, user3] = users;

    expect(users).toBeDefined();
    expect(users).toHaveLength(3);
    expect(user1.email).toEqual('alex.volontyr@gmail.com');
    expect(user2.email).toEqual('dmytro.anastasiev@gmail.com');
    expect(user3.email).toEqual('petrovich@gmail.com');
  });

  it('createUser should return new object of user', async () => {
    const users = usersService.createUser(mockUser);
    users.sort(({email: a}: any, {email: b}: any) => a > b ? 1 : a < b ? -1 : 0);

    const [user1, user2, user3, user4] = users;

    expect(users).toBeDefined();
    expect(users).toHaveLength(4);
    expect(user1.email).toEqual('alex.volontyr@gmail.com');
    expect(user2.email).toEqual('dmytro.anastasiev@gmail.com');
    expect(user3.email).toEqual('petrovich@gmail.com');
    expect(user4.email).toEqual('test@test.com');
  });

  it('updateUser should return new object of user', async () => {
    const users = usersService.updateUser("1", mockUser);

    users.sort(({email: a}: any, {email: b}: any) => a > b ? 1 : a < b ? -1 : 0);

    const [user1, user2, user3, user4] = users;

    expect(users).toBeDefined();
    expect(users).toHaveLength(4);
    expect(user1.email).toEqual('dmytro.anastasiev@gmail.com');
    expect(user2.email).toEqual('petrovich@gmail.com');
    expect(user3.email).toEqual('test@test.com');
    expect(user4.email).toEqual('test@test.com');
  });
});