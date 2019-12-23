import {Controller, Get, Post, Patch, Delete, Body, Param} from 'routing-controllers';
import {Container} from 'typedi';

import UsersOrchestrator from './users.orchestrator';

@Controller()
export default class UsersRouter {
  private usersOrchestrator: UsersOrchestrator;

  constructor() {
    this.usersOrchestrator = Container.get(UsersOrchestrator);
  }

  @Get('/users')
  getAll(): Object {
    return this.usersOrchestrator.getAllUsers();
  }

  @Post('/users')
  post(@Body() user: any): Object {
    return this.usersOrchestrator.postUser(user);
  }

  @Patch('/users/:id')
  update(@Param("id") id: number, @Body() user: any): Object {
    return this.usersOrchestrator.patchUser(id, user);
  }

  @Delete('/users/:id')
  delete(@Param("id") id: number): Object {
    return this.usersOrchestrator.deleteUser(id);
  }

}