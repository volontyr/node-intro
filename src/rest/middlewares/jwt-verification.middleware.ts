import jwt from 'jsonwebtoken';
import {Service} from 'typedi';

import config from '../../../config';

@Service()
export default class JwtVerificationMiddleware {
  public excludedUrls = ['/login.*', '/docs.*', '/register.*'];

  constructor() {}

  use = (req: any, res: any, next: any) => {
    if (this.excludedUrls.some(url => new RegExp(`^${url}\/?$`).test(req.originalUrl))) {
      return next();
    }

    const token = req.headers['x-auth-token'];
    if (!token) {
      return res.status(403).send({auth: false, message: 'No token provided.'});
    }

    jwt.verify(token, config.secret, function (err: any, decoded: any): any {
      if (err) {
        return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
      }

      next();
    });
  }
}