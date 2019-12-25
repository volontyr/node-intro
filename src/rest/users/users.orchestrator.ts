import {Service} from 'typedi';

import {UsersService} from '../../users';
import {UniversityService} from '../../universities';

@Service()
export default class UsersOrchestrator {

  constructor(
    private readonly usersService: UsersService,
    private readonly universityService: UniversityService,
  ) {}

  public getAllUsers(): any {
    return this.usersService.getAllUsers();
  }

  public createUser(user: any): any {
    return this.usersService.createUser(user);
  }


  public assign(userId:any, universityId: any ): any {
    const universities = this.universityService.getAllUniversities();
    const university = universities.find(({id}: any) => id === universityId);
    if (!university) {
      return null
    }
    return this.usersService.assign(userId, university);
  }

  public updateUser(id: string, user: any): any {
    return this.usersService.updateUser(id, user);
  }

  public deleteUser(id: string): any {
    return this.usersService.deleteUser(id);
  }

}