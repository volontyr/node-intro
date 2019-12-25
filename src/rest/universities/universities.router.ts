import {Controller, Get, Post, Patch, Delete, Body, Param} from 'routing-controllers';
import {Container} from 'typedi';

import UniversitiesOrchestrator from './universities.orchestrator';

@Controller()
export default class UniversitiesRouter {
  private universityOrchestrator: UniversitiesOrchestrator;

  constructor() {
    this.universityOrchestrator = Container.get(UniversitiesOrchestrator);
  }

  @Get('/universities')
  getAll(): Object {
    return this.universityOrchestrator.getAllUniversities();
  }

  @Post('/universities')
  createUniversities(@Body() university: any): Object {
    return this.universityOrchestrator.createUniversity(university);
  }

  @Patch('/universities/:id')
  updateUniversities(@Param("id") id: string, @Body() university: any): Object {
    return this.universityOrchestrator.updateUniversity(id, university);
  }

  @Delete('/universities/:id')
  deleteUniversities(@Param("id") id: string): Object {
    return this.universityOrchestrator.deleteUniversity(id);
  }

}