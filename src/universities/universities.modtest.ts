import * as fs from 'fs';

import {Container} from 'typedi';
import UniversityService from './universities.service';
import * as path from "path";


const universitiesService = Container.get(UniversityService);

describe('Universities service tests', () => {
  const mockUniversity = {name: "NAUSHNIK", city: "Kyiv"};
  const MOCK_PATH = path.resolve(path.dirname(process.env.DB_PATH), 'mock_db.json');
  beforeAll(() => {
    const DB_MOCK = fs.readFileSync(process.env.DB_PATH, {encoding: 'utf8'});
    fs.writeFileSync(MOCK_PATH, DB_MOCK, {encoding: 'utf8'})
  });

  afterAll(() => {
    const DB_MOCK = fs.readFileSync(MOCK_PATH, {encoding: 'utf8'});
    fs.writeFileSync(process.env.DB_PATH, DB_MOCK, {encoding: 'utf8'});
    fs.unlinkSync(MOCK_PATH);
  });

  it('getAllUniversities should return an array of university objects', async () => {
    const universities = universitiesService.getAllUniversities();

    universities.sort(({name: a}: any, {name: b}: any) => a > b ? 1 : a < b ? -1 : 0);

    const [university1] = universities;

    expect(universities).toBeDefined();
    expect(universities).toHaveLength(1);
    expect(university1.name).toEqual('KPI');
  });

  it('createUniversity should return new object of university', async () => {
    const universities = universitiesService.createUniversity(mockUniversity);
    universities.sort(({name: a}: any, {name: b}: any) => a > b ? 1 : a < b ? -1 : 0);

    const [university1, university2] = universities;

    expect(universities).toBeDefined();
    expect(universities).toHaveLength(2);
    expect(university1.name).toEqual('KPI');
    expect(university2.name).toEqual('NAUSHNIK');
  });

  it('updateUniversity should return new object of university', async () => {
    const universities = universitiesService.updateUniversity("123", mockUniversity);

    universities.sort(({name: a}: any, {name: b}: any) => a > b ? 1 : a < b ? -1 : 0);

    const [university1, university2] = universities;

    expect(universities).toBeDefined();
    expect(universities).toHaveLength(2);
    expect(university1.name).toEqual('NAUSHNIK');
    expect(university2.name).toEqual('NAUSHNIK');
  });
});