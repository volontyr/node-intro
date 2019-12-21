import AuthOrchestrator from './auth.orchestrator';
import { BaseRouter } from '../base.router';
import { Service } from 'typedi';

@Service()
export default class AuthRouter extends BaseRouter {

  constructor(private readonly authOrchestrator: AuthOrchestrator) {
    super();
    this.initializeRouteHandlers();
  }

  initializeRouteHandlers(): void {
    this.router.post('/login', this.authenticate);
  }

  private authenticate = (req: any, res: any) => {
    const authentication = this.authOrchestrator.authenticate(req.body);
    if (!authentication) {
      res.status(404).send('User not found.');
      return;
    }

    const { auth } = authentication;

    if (!auth) {
      res.status(401).send(authentication)
      return;
    }

    res.status(200).send(authentication);
  }
}