import { Router } from 'express';
import { Service } from 'typedi'; // tslint:disable-line:ayx-aep-no-container-get

// This class mainly exists to give extended router classes access to the configuration file as well as
// an express router
@Service()
export class BaseRouter {
  protected router: Router;


  constructor() {
    // All routers should call an init function from their constructor that sets up all of the routes.
    // This isn't enforced in any way but for routers that have many endpoints it helps to keep the constructor neat.
    this.router = Router();
  }

  public getRouter(): Router {
    return this.router;
  }
}
