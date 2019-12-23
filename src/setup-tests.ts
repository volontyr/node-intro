import 'reflect-metadata';
import * as path from 'path';

(() => {
  // common setup here (for now nothing is needed to setup, but in future any setup process should be defined here)
  process.env.DB_USERS = path.resolve(__dirname, './__mocks__/users.json')
})();
