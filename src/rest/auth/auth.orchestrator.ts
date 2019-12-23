import {AuthService} from '../../auth';
import {UsersService} from '../../users'
import {Service} from 'typedi';

@Service()
export default class AuthOrchestrator {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {
  }

  public authenticate(user: { email: string, password: string }): any {
    const users = this.userService.getAllUsers();
    return this.authService.authenticate(user, users);
  }

  public register(user: { email: string, password: string }): any {
    const users = this.userService.getAllUsers();
    return this.authService.register(user, users);
  }
}