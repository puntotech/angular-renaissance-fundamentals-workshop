import { Hero, PowerStats } from '../interfaces/hero.interface';
import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { HeroServiceAbstract } from './hero.service.abstract';
import { HttpClient } from '@angular/common/http';

/* TODO 711: Extend the class to the abstract class `HeroServiceAbstract` */
@Injectable({ providedIn: 'root' })
export class HeroService extends HeroServiceAbstract {

  /* TODO 711: Remove all properties since the data will no longer be in the service. */
   /* TODO 712: Inject the `httpClient` service into a private, read-only property called `httpClient`. */
  readonly #httpClient = inject(HttpClient);

   /* TODO 713: CCreate the `load` method, which connects to `this.API_ENDPOINT` using the `get` verb */
  load(): Observable<{ heroes: Hero[]; total: number }> {
    return this.#httpClient
      .get<{ heroes: Hero[]; total: number }>(this.API_ENDPOINT)
      .pipe(
        tap(result => console.log(result)),
        catchError((error) => {
          console.error('Failed to load heroes', error);
          return throwError(() => error);
        })
      );
  }

  /* TODO 714: Update the add method to use the httpClient to post a new hero to the API_ENDPOINT. */
  add(hero: Partial<Hero>): Observable<Hero> {
    return this.#httpClient.post<Hero>(this.API_ENDPOINT, hero).pipe(
      tap(console.log),
      catchError((error) => {
        console.error('Failed to add an hero', error);
        return throwError(() => error);
      })
    );
  }

  /* TODO 715: Update the update method to use the httpClient to put the hero to the API_ENDPOINT. */
  update(heroToUpdate: Hero): Observable<Hero> {
    return this.#httpClient.put<Hero>(`${this.API_ENDPOINT}/${heroToUpdate.id}`, heroToUpdate).pipe(
      tap(console.log),
      catchError((error) => {
        console.error('Failed to update hero', error);
        return throwError(() => error);
      })
    );
  }

   /* TODO 717: Update the remove method to use the httpClient to delete the hero from the API_ENDPOINT. */
  remove(hero: Hero): Observable<Hero> {
    return this.#httpClient.delete<Hero>(`${this.API_ENDPOINT}/${hero.id}`).pipe(
      tap(console.log),
      catchError((error) => {
        console.error('Error deleting hero', error);
        return throwError(() => error);
      })
    );
  }

   /* TODO 716: Update  the updatePowerstat method to use the this.update method. */
  updatePowerstat(hero: Hero, powerstat: keyof PowerStats, value: number): Observable<Hero> {
    const heroToUpdate = {
          ...hero,
          powerstats: {
            ...hero.powerstats,
            [powerstat]: hero.powerstats[powerstat] + value
          },  };
    return this.update(heroToUpdate);
  }

  /* TODO 719: Update the findAll method to use the httpClient to get the heroes from the API_ENDPOINT. */
  findAll({ page, limit } = { page: 1, limit: 600 }): Observable<{ heroes: Hero[]; total: number }> {
    return this.#httpClient.get<{ heroes: Hero[]; total: number }>(
      `${this.API_ENDPOINT}?_page=${page}&_limit=${limit}`
    );
  }

  /* TODO 718: Update the findOne method to use the httpClient to get the hero from the API_ENDPOINT. */
  findOne(id: number): Observable<Hero> {
    return this.#httpClient.get<Hero>(`${this.API_ENDPOINT}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching hero', error);
        return of(this.NullHero);
      })
    );
  }

}
