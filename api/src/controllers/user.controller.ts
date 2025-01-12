import { Request, Response, Router } from 'express';

import { UserService } from '../services/user.service';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class UserController {
  public router = Router();

  constructor(private userService: UserService) {
    this.#setRoutes();
  }

  #setRoutes() {
    this.router.route('/').get((req: Request, res: Response) => {
      res.send('User API');
    });
    this.router.route('/login').post(this.#login);
    this.router.route('/register').post(this.#register);
  }

  #login = (req: Request, res: Response) => {
    try {
      const response = this.userService.login(req.body);
      res.send(response);
    } catch {
      return res.status(400).json({ msg: 'Error: username/password.' });
    }
  };

  #register = (req: Request, res: Response) => {
    try {
      this.userService.register(req.body);
    } catch {
      return res
        .status(400)
        .json({ msg: 'Error: User already exists, please login.' });
    }
    res.json({
      msg: 'Successfully created user, please login',
    });
  };
}
