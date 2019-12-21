import { Controller, Get } from 'routing-controllers';
import { Container } from 'typedi';

import UsersOrchestrator from './users.orchestrator';

@Controller()
export default class UsersRouter {
  private usersOrchestrator: UsersOrchestrator;

  constructor() {
    this.usersOrchestrator = Container.get(UsersOrchestrator);
  }

  @Get('/users')
  getAll():Object {
    return this.usersOrchestrator.getAllUsers();
  }
}