import 'reflect-metadata';
import * as path from 'path';

(() => {
  // common setup here (for now nothing is needed to setup, but in future any setup process should be defined here)
  process.env.DB_PATH = path.resolve(__dirname, './__mocks__/users.json');
  process.env.SERVER_HOST = 'http://localhost:8080'
})();
