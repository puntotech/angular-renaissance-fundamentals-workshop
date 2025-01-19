import { Hero, PowerStats } from '../../interfaces/hero.interface';
import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { HeroServiceAbstract } from '../hero.service.abstract';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HeroService01 extends HeroServiceAbstract {

  readonly #httpClient = inject(HttpClient);

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

  add(hero: Partial<Hero>): Observable<Hero> {
    return this.#httpClient.post<Hero>(this.API_ENDPOINT, hero).pipe(
      tap(console.log),
      catchError((error) => {
        console.error('Failed to add an hero', error);
        return throwError(() => error);
      })
    );
  }

  update(heroToUpdate: Hero): Observable<Hero> {
    return this.#httpClient.put<Hero>(`${this.API_ENDPOINT}/${heroToUpdate.id}`, heroToUpdate).pipe(
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
