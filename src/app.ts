import * as path from 'path';
import { Container } from 'typedi';
import express from 'express';
import 'reflect-metadata';
import { useExpressServer } from 'routing-controllers';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

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

// Swagger set up
const swaggerOptions = {
  definition: {
    info: {
      title: "Time to document that Express API you built",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:8080"
      }
    ]
  },
  apis: ['./rest/auth/auth.router.js']
};
const swaggerSpecs = swaggerJsdoc(swaggerOptions);
router.use('/docs', swaggerUi.serve);
router.get(
  '/docs',
  swaggerUi.setup(swaggerSpecs, {
    isExplorer: true
  })
);

// start the express server
app.listen( port, () => {
  // tslint:disable-next-line:no-console
  console.log( `server started at http://localhost:${ port }` );
} );