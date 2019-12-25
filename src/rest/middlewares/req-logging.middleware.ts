import { Service } from 'typedi';


@Service()
export default class RequestLoggingMiddleware {

  constructor() {}

  use = (req: any, res: any, next: any) => {
    console.info(`---[${req.method}] ${req.originalUrl}---`);
    return next();
  }
}