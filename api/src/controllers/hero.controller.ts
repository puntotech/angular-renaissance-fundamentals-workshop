import { Request, Response, Router } from 'express';

import { HeroDTO } from '../interfaces/hero.dto';
import { HeroService } from '../services/hero.service';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class HeroController {
  public router = Router();

  constructor(private heroService: HeroService) {
    this.#setRoutes();
  }

  #setRoutes() {
    this.router.route('/').get(this.#findAll);
    this.router.route('/').post(this.#add);
    this.router.route('/:id').get(this.#findOne);
    this.router.route('/:id').patch(this.#update);
    this.router.route('/:id').delete(this.#delete);
    this.router.route('/:id').put(this.#update);
  }

  #findAll = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 600;
      const result = this.heroService.findAll(page, limit);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch heroes' });
    }
  };

  #findOne = (req: Request, res: Response) => {
    const hero = this.heroService.find(req.params.id);
    res.send(hero);
  };

  #add = (req: Request, res: Response) => {
    const hero = new HeroDTO().fromJSON(req.body).toJSON();
    const addHeroResult = this.heroService.add(hero);
    res.send(addHeroResult);
  };

  #delete = (req: Request, res: Response) => {
    try {
      const deleteHeroResult = this.heroService.delete(req.params.id);
      res.send(deleteHeroResult);
    } catch {
      res.status(404).send({ error: 'Hero not found' });
    }
  };

  #update = (req: Request, res: Response) => {
    const hero = req.body;
    try {
      const updateHeroResult = this.heroService.update(req.params.id, hero);
      res.send(updateHeroResult);
    } catch {
      res.status(404).send({ error: 'Hero not found' });
    }
  };
}
