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
  createUser(@Body() user: any): Object {
    return this.usersOrchestrator.createUser(user);
  }

  @Post('/users/:userId/assign/:universityId')
  assignUser(@Param("userId") userId: string, @Param("universityId") universityId: string,): Object {
    return this.usersOrchestrator.assign(userId, universityId);
  }

  @Patch('/users/:id')
  updateUser(@Param("id") id: string, @Body() user: any): Object {
    return this.usersOrchestrator.updateUser(id, user);
  }

  @Delete('/users/:id')
  deleteUser(@Param("id") id: string): Object {
    return this.usersOrchestrator.deleteUser(id);
  }

}