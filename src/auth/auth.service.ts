import * as fs from 'fs';
import {Service} from 'typedi';
import jwt from 'jsonwebtoken';

import config from '../../config';

@Service()
export default class AuthService {
    public authenticate(usr: { email: string, password: string }): any {
        const usersString = fs.readFileSync(process.env.DB_USERS, {
            encoding: 'utf8'
        });
        const {users} = JSON.parse(usersString);

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

        return {auth: true, token: token};
    }
}