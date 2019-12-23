import { Container } from 'typedi';
import * as fs from 'fs';
import express from 'express';
import 'reflect-metadata';
import { useExpressServer } from 'routing-controllers';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

import { UsersRouter } from './rest/users';
import { AuthRouter } from './rest/auth';
import { JwtVerificationMiddleware } from './rest/middlewares';
import { SWAGGER_FILE } from './constants';

const swaggerDocument = JSON.parse(fs.readFileSync(SWAGGER_FILE, 'utf8'));

const authRouter = Container.get(AuthRouter);

const port = 8080;

const jwtVerificationMiddleware = new JwtVerificationMiddleware();

// creates express app, registers all controller routes and returns you express app instance
const app = express();

app.use(jwtVerificationMiddleware.use as express.RequestHandler);

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use('/', authRouter.getRouter());

app.use('/', router);
useExpressServer(app, {
  controllers: [UsersRouter],
  middlewares: [JwtVerificationMiddleware]
});

router.use('/docs', swaggerUi.serve);
router.get(
  '/docs',
  swaggerUi.setup(swaggerDocument, {
    isExplorer: true
  })
);

// start the express server
app.listen( port, () => {
  // tslint:disable-next-line:no-console
  console.log( `server started at http://localhost:${ port }` );
} );