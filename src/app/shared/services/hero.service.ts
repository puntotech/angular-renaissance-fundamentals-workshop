import { Hero, PowerStats } from '../interfaces/hero.interface';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { HeroServiceAbstract } from './hero.service.abstract';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HeroService extends HeroServiceAbstract{
  /*
  TODO 730: Replace the #heroesSubject property with #heroesSignal.
  TODO 730: Replace the heroes$ property with heroes (computed from this.#heroSubject).
  */
  #heroesSignal = signal<Hero[]>([]); // It is the state of the heroes
  heroes = computed(() => this.#heroesSignal());
  readonly #httpClient = inject(HttpClient);

  load(): Observable<{ heroes: Hero[]; total: number }> {
    return this.#httpClient
      .get<{ heroes: Hero[]; total: number }>(this.API_ENDPOINT)
      .pipe(
/* TODO 731: Replace the heroesSubject property with  heroesSignal */
        tap(result => this.#heroesSignal.set(result.heroes)),
        catchError((error) => {
          console.error('Failed to load heroes', error);
          return throwError(() => error);
        })
      );
  }

  add(hero: Partial<Hero>): Observable<Hero> {
    return this.#httpClient.post<Hero>(this.API_ENDPOINT, hero).pipe(
/* TODO 732: Replace the heroesSubject property with  heroesSignal */
      tap(newHero => this.#heroesSignal.update((currentHeroes) => [...currentHeroes, newHero])),
      catchError((error) => {
        console.error('Failed to add an hero', error);
        return throwError(() => error);
      })
    );
  }
  update(heroToUpdate: Hero): Observable<Hero> {
    return this.#httpClient.put<Hero>(`${this.API_ENDPOINT}/${heroToUpdate.id}`, heroToUpdate).pipe(
  /* TODO 733: Replace the heroesSubject property with  heroesSignal */
      tap(updatedHero => this.#heroesSignal.update(currentHeroes =>
          currentHeroes.map(heroe => heroe.id === updatedHero.id ? updatedHero : heroe))),
      catchError((error) => {
        console.error('Failed to update hero', error);
        return throwError(() => error);
      })
    );
  }

  remove(hero: Hero): Observable<Hero> {
    const { id } = hero;

    return this.#httpClient.delete<Hero>(`${this.API_ENDPOINT}/${id}`).pipe(
 /* TODO 734: Replace the heroesSubject property with  heroesSignal */
      tap(() =>
        this.#heroesSignal.update((currentHeroes) =>
          currentHeroes.filter((hero) => hero.id !== id)
        )
      ),
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
 /* TODO 735: Replace the heroesSubject property with  heroesSignal */
 return this.#httpClient.get<{ heroes: Hero[]; total: number }>(
      `${this.API_ENDPOINT}?_page=${page}&_limit=${limit}`
    ).pipe(tap(result => this.#heroesSignal.set(result.heroes)),);
  }

  findOne(id: number): Observable<Hero> {
    return this.#httpClient.get<Hero>(`${this.API_ENDPOINT}/${id}`);
  }
}
