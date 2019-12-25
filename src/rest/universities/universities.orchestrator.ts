import {Service} from 'typedi';

import {UniversityService} from '../../universities';

@Service()
export default class UniversitiesOrchestrator {

  constructor(private readonly universityService: UniversityService) {}

  public getAllUniversities(): any {
    return this.universityService.getAllUniversities();
  }

  public createUniversity(university: any): any {
    return this.universityService.createUniversity(university);
  }

  public updateUniversity(id: string, university: any): any {
    return this.universityService.updateUniversity(id, university);
  }

  public deleteUniversity(id: string): any {
    return this.universityService.deleteUniversity(id);
  }

}