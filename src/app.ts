import * as path from 'path';
import { Container } from 'typedi';
import express from 'express';
import 'reflect-metadata';
import { useExpressServer } from 'routing-controllers';
import { UsersRouter } from './rest/users';
import { AuthRouter } from './rest/auth';

import { JwtVerificationMiddleware } from './rest/middlewares';

const authRouter = Container.get(AuthRouter);

const port = 8080;

const jwtVerificationMiddleware = new JwtVerificationMiddleware();

// creates express app, registers all controller routes and returns you express app instance
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(jwtVerificationMiddleware.use as express.RequestHandler);

const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use('/', authRouter.getRouter());

app.use('/', router);
useExpressServer(app, {
  controllers: [UsersRouter],
  middlewares: [JwtVerificationMiddleware]
});

// start the express server
app.listen( port, () => {
  // tslint:disable-next-line:no-console
  console.log( `server started at http://localhost:${ port }` );
} );