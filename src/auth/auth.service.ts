import {Service} from 'typedi';
import jwt from 'jsonwebtoken';

import config from '../../config';
import UsersRepository from "../users/users.repository";
import {v4 as uuid} from "uuid";

@Service()
export default class AuthService {
  constructor(private readonly userRepository: UsersRepository) {}

  public authenticate(usr: { email: string, password: string }, users: any[]): any {
    const user = users.find((user: any) => user.email === usr.email);

    if (!user) {
      return null;
    }
    const passwordIsValid = usr.password === user.password;
    if (!passwordIsValid) {
      return {auth: false, token: null};
    }

    const token = jwt.sign({id: user._id}, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    return {auth: true, token: token, ...user};
  }

  public register(user: any, users: any[]): any {
    // Validate email isn't exist
    if (users.find(({email}) => {
      return email === user.email;
    })) {
      return null
    }
    user.id = uuid();
    const register_user =  this.userRepository.addUser(user);

    const token = jwt.sign({id: register_user.id}, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    return {token: token, ...register_user};
  }
}