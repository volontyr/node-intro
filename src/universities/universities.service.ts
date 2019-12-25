import {Service} from 'typedi';
import _ from 'lodash';
import { v4 as uuid}  from 'uuid'
import UniversitiesRepository from './universities.repository';
import {Exclusion} from "tslint/lib/rules/completed-docs/exclusion";

@Service()
export default class UniversitiesService {

  constructor(private readonly universitiesRepository: UniversitiesRepository) {
  }

  public getAllUniversities(): any {
    return this.universitiesRepository.getAllUniversities();
  }

  public createUniversity(university: any): any {
    const universities = this.universitiesRepository.getAllUniversities();
    const db_university = universities.find(({name}: any) => name === university.name);
    if (db_university){
      throw new Error('University already exist');
    }
    university.id = uuid();
    return this.universitiesRepository.addUniversity(university);
  }

  public updateUniversity(id: string, university: any): any {
    const universities = this.universitiesRepository.getAllUniversities();
    // Find by id
    const db_university = universities.find(({id: db_id}: any): any => id === db_id);
    if (!db_university) {
      throw new Error('University not found');
    }
    universities[universities.indexOf(db_university)] = {...university, 'id': id};
    // Update
    return this.universitiesRepository.saveAllUniversities(universities);
  }

  public deleteUniversity(id: string): any {
    const universities = this.universitiesRepository.getAllUniversities();
    // Find by id and delete
    const db_university = _.remove(universities,({id: db_id}: any): any => id === db_id);
    if (!db_university.length) {
      throw new Error('University not found');
    }
    return this.universitiesRepository.saveAllUniversities(universities);
  }

}