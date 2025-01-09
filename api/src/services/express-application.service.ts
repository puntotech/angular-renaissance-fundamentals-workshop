import { autoInjectable, container } from "tsyringe";

import { HeroController } from '../controllers/hero.controller';
import { UserController } from '../controllers/user.controller';
import cors from 'cors';
import express from 'express';
import { handleErrors } from '../middleware/error-handler.middleware';

@autoInjectable()
export class ExpressApplicationService {
  #app: express.Application = express();

  get app(){
    return this.#app;
  }

  constructor(private heroController: HeroController, private userController: UserController) {
    this.#setConfig();
    this.#setControllers();
    this.#setErrorHandlingMiddleware();
  }

  #setConfig() {
    this.#app.use(express.json({ limit: '50mb' }));
    this.#app.use(cors());
  }

  #setControllers() {
    this.#app.use('/heroes', this.heroController.router);
    this.#app.use('/user', this.userController.router);
  }

  #setErrorHandlingMiddleware() {
    this.#app.use(handleErrors);
  }
}
