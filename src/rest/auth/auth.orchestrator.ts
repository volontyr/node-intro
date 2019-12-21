import { AuthService } from '../../auth';
import { Service } from 'typedi';

@Service()
export default class AuthOrchestrator {

  constructor(private readonly authService: AuthService) {}

  public authenticate(user: { email: string, password: string }): any {
    return this.authService.authenticate(user);
  }
}