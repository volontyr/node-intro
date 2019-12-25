import { Service } from 'typedi';


@Service()
export default class ErrorHandlerMiddleware {

  constructor() {}

  use = (err:any, req: any, res: any, next: any) => {
    return res.status(500, {error: err});
  }
}