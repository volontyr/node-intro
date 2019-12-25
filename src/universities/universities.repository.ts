import * as fs from 'fs';
import {Service} from 'typedi';

import {DB_FILE} from '../constants';

@Service()
export default class UniversitiesRepository {

  public getAllUniversities(): any {
    const usersString = fs.readFileSync(process.env.DB_PATH || DB_FILE, {
      encoding: 'utf8'
    });
    return JSON.parse(usersString).universities;
  }

  public saveAllUniversities(universities: any): any {
    const dbStoreString = fs.readFileSync(process.env.DB_PATH || DB_FILE, {
      encoding: 'utf8'
    });
    const dbStore = JSON.parse(dbStoreString);
    dbStore.universities = universities;
    fs.writeFileSync(process.env.DB_PATH || DB_FILE, JSON.stringify(dbStore), {
      encoding: 'utf8'
    });
    return universities;
  }

  public addUniversity(university: any): any {
    const dbStoreString = fs.readFileSync(process.env.DB_PATH || DB_FILE, {
      encoding: 'utf8'
    });
    const dbStore = JSON.parse(dbStoreString);
    dbStore.universities.push(university);
    fs.writeFileSync(process.env.DB_PATH || DB_FILE, JSON.stringify(dbStore), {
      encoding: 'utf8'
    });
    return dbStore.universities;
  }

}