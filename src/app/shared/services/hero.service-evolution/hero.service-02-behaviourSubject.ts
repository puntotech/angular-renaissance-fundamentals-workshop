import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Hero, PowerStats } from '../../interfaces/hero.interface';
import { Injectable, inject } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';

import { HeroServiceAbstract } from '../hero.service.abstract';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HeroService extends HeroServiceAbstract{
  readonly #heroesSubject = new BehaviorSubject<Hero[]>([]);
  readonly heroes$ = this.#heroesSubject.asObservable();
  readonly #httpClient = inject(HttpClient);

  load(): Observable<{ heroes: Hero[]; total: number }> {
    return this.#httpClient
      .get<{ heroes: Hero[]; total: number }>(this.API_ENDPOINT)
      .pipe(
        tap(result => this.#heroesSubject.next(result.heroes)),
        catchError((error) => {
          console.error('Failed to load heroes', error);
          return throwError(() => error);
        })
      );
  }

  add(hero: Partial<Hero>): Observable<Hero> {
    return this.#httpClient.post<Hero>(this.API_ENDPOINT, hero).pipe(
      tap(newHero => {
        const currentHeroes = this.#heroesSubject.getValue();
        this.#heroesSubject.next([...currentHeroes, newHero]);
      }),
      catchError((error) => {
        console.error('Failed to add an hero', error);
        return throwError(() => error);
      })
    );
  }
  update(heroToUpdate: Hero): Observable<Hero> {
    return this.#httpClient.put<Hero>(`${this.API_ENDPOINT}/${heroToUpdate.id}`, heroToUpdate).pipe(
      tap(updatedHero => {
        const currentHeroes = this.#heroesSubject.getValue();
        const updatedHeroes = currentHeroes.map((hero) =>
          hero.id === updatedHero.id ? updatedHero : hero
        );
        this.#heroesSubject.next(updatedHeroes);
      }),
      catchError((error) => {
        console.error('Failed to update hero', error);
        return throwError(() => error);
      })
    );
  }

  remove(hero: Hero): Observable<Hero> {
    const { id } = hero;

    return this.#httpClient.delete<Hero>(`${this.API_ENDPOINT}/${id}`).pipe(
      tap(() => {
        const updatedState = this.#heroesSubject
          .getValue()
          .filter((hero) => hero.id !== id);
        this.#heroesSubject.next(updatedState);
      }),
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
        [powerstat]: hero.powerstats[powerstat] + value,
      },
    };
    return this.update(heroToUpdate);
  }

  findAll({ page, limit } = { page: 1, limit: 600 }): Observable<{ heroes: Hero[]; total: number }> {
    return this.#httpClient.get<{ heroes: Hero[]; total: number }>(
      `${this.API_ENDPOINT}?_page=${page}&_limit=${limit}`
    ).pipe(tap(result => this.#heroesSubject.next(result.heroes)));
  }

  findOne(id: number): Observable<Hero> {
    return this.#httpClient.get<Hero>(`${this.API_ENDPOINT}/${id}`);
  }
}
