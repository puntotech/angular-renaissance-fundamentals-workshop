import { Hero, PowerStats } from '../interfaces/hero.interface';
import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { HeroServiceAbstract } from './hero.service.abstract';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HeroService extends HeroServiceAbstract {
  /* TODO 720: Create an heroesSubject property privated and readonly which is a BehaviourSubject<Hero[]> */
  /* TODO 720: Create an heroes$ property public and readonly which is an Observable<Hero[]> */
  readonly #httpClient = inject(HttpClient);

  load(): Observable<{ heroes: Hero[]; total: number }> {
    return this.#httpClient
      .get<{ heroes: Hero[]; total: number }>(this.API_ENDPOINT)
      .pipe(
  /* TODO 721: Update the heroesSubject property with the result of the API call */
        tap(result => console.log(result)),
        catchError((error) => {
          console.error('Failed to load heroes', error);
          return throwError(() => error);
        })
      );
  }

    add(hero: Partial<Hero>): Observable<Hero> {
    return this.#httpClient.post<Hero>(this.API_ENDPOINT, hero).pipe(
  /* TODO 722: Update the heroesSubject property with the new hero */
      tap(console.log),
      catchError((error) => {
        console.error('Failed to add an hero', error);
        return throwError(() => error);
      })
    );
  }

   update(heroToUpdate: Hero): Observable<Hero> {
    return this.#httpClient.put<Hero>(`${this.API_ENDPOINT}/${heroToUpdate.id}`, heroToUpdate).pipe(
 /* TODO 723: Update the heroesSubject property with the updated hero */
      tap(console.log),
      catchError((error) => {
        console.error('Failed to update hero', error);
        return throwError(() => error);
      })
    );
  }


  remove(hero: Hero): Observable<Hero> {
    return this.#httpClient.delete<Hero>(`${this.API_ENDPOINT}/${hero.id}`).pipe(
      tap(console.log),
/* TODO 724: Update the heroesSubject property removing the hero */
      catchError((error) => {
        console.error('Error deleting hero', error);
        return throwError(() => error);
      })
    );
  }

  updatePowerstat(hero: Hero, powerstat: keyof PowerStats, value: number): Observable<Hero> {
    const heroToUpdate = {
          ...hero,
          powerstats: {
            ...hero.powerstats,
            [powerstat]: hero.powerstats[powerstat] + value
          },  };
    return this.update(heroToUpdate);
  }

   findAll({ page, limit } = { page: 1, limit: 600 }): Observable<{ heroes: Hero[]; total: number }> {
/* TODO 725: Update the heroesSubject property with the result of the API call */
    return this.#httpClient.get<{ heroes: Hero[]; total: number }>(
      `${this.API_ENDPOINT}?_page=${page}&_limit=${limit}`
    );
  }

   findOne(id: number): Observable<Hero> {
    return this.#httpClient.get<Hero>(`${this.API_ENDPOINT}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching hero', error);
        return of(this.NullHero);
      })
    );
  }

}
