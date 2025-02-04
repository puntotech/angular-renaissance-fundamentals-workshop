import { Hero, PowerStats } from '../../../features/heroes/interfaces/hero.interface';
import { Injectable, ResourceRef, Signal, computed, inject, signal } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { HeroServiceAbstract } from '../hero.service.abstract';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HeroService extends HeroServiceAbstract {

  #heroesSignal = signal<Hero[]>([]); // It is the state of the heroes
  heroes = computed(() => this.#heroesSignal());

  readonly #httpClient = inject(HttpClient);
  readonly #API_ENDPOINT = 'http://localhost:9000/heroes';


    load(): Observable<{ heroes: Hero[]; total: number }> {
      return this.#httpClient
        .get<{ heroes: Hero[]; total: number }>(this.#API_ENDPOINT)
        .pipe(
          tap(result => this.#heroesSignal.set(result.heroes)),
          catchError((error) => {
            console.error('Failed to load heroes', error);
            return throwError(() => error);
          }));

  }

  add(hero: Partial<Hero>): Observable<Hero> {
    return this.#httpClient.post<Hero>(this.#API_ENDPOINT, hero).pipe(
      tap(newHero => this.#heroesSignal.update((currentHeroes) => [...currentHeroes, newHero])));
  }
  update(heroToUpdate: Hero): Observable<Hero> {
    return this.#httpClient.put<Hero>(`${this.#API_ENDPOINT}/${heroToUpdate.id}`, heroToUpdate).pipe(
      tap(updatedHero => {
        this.#heroesSignal.update(currentHeroes =>
          currentHeroes.map(heroe => heroe.id === updatedHero.id ? updatedHero : heroe)
        )
      }),
      catchError((error) => {
        console.error('Failed to update hero', error);
        return throwError(() => error);
      })
    );
  }

  remove(hero: Hero): Observable<Hero> {
    const { id } = hero;

    return this.#httpClient.delete<Hero>(`${this.#API_ENDPOINT}/${id}`).pipe(
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
    return this.#httpClient.get<{ heroes: Hero[]; total: number }>(`${this.#API_ENDPOINT}?_page=${page}&_limit=${limit}`).pipe(
      tap(result => this.#heroesSignal.set(result.heroes)),
      catchError((error) => {
        console.error('Failed to load heroes', error);
        return throwError(() => error);
      })
    );
  }

 findOne(id: number): Observable<Hero> {
  return this.#httpClient.get<Hero>(`${this.#API_ENDPOINT}/${id}`).pipe(
    catchError((error) => {
      console.error('Failed to load hero', error);
      return throwError(() => error);
    }
  ));
  }
}
