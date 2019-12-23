import { Container } from 'typedi';
import UsersService from './users.service';

const usersService = Container.get(UsersService);

describe('Users service tests', () => {
  it('getAllUsers should return an array of user objects', async () => {
    const users = usersService.getAllUsers();

    users.sort(({ email: a }: any, { email: b }: any) => a > b ? 1 : a < b ? -1 : 0);

    const [user1, user2] = users;

    expect(users).toBeDefined();
    expect(users).toHaveLength(2);
    expect(user1.email).toEqual('alex.volontyr@gmail.com');
    expect(user2.email).toEqual('dmytro.anastasiev@gmail.com');
  });
});