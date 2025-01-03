import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { Hero } from '../interfaces/hero.interface';
import { HeroService } from '../services/hero.service';
import { inject } from '@angular/core';

export const heroResolver: ResolveFn<Hero> = (route: ActivatedRouteSnapshot) => inject(HeroService).findOne(parseInt(route.paramMap.get('id')!, 10));
