import { Hero } from '../interfaces/hero.interface';
import { autoInjectable } from 'tsyringe';
import { heroes } from '../heroes-db-lite';

@autoInjectable()
export class HeroService {
  #fakeID = 10000;
  #heroes: Hero[] = heroes;

  findAll(page: number, limit: number): { heroes: Hero[]; total: number } {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedHeroes = this.#heroes.slice(startIndex, endIndex);
    return {
      heroes: paginatedHeroes,
      total: this.#heroes.length,
    };
  }

  find(id: string | number): Hero {
    const ID = this.#convertID(id);
    return this.#heroes.find((hero) => hero.id === ID) || ({} as Hero);
  }

  add(hero: Hero): Hero {
    this.#fakeID++;
    hero.id = hero.id ?? this.#fakeID;
    this.#heroes = [hero, ...this.#heroes];
    return hero;
  }

  delete(id: string | number): void {
    const ID = this.#convertID(id);
    const hero = this.find(ID);
    if (this.#isNull(hero)) {
      throw new Error('Hero not found');
    }
    this.#heroes = this.#heroes.filter((hero) => hero.id !== ID);
  }

  update(id: string | number, updatedHero: Hero | Partial<Hero>) {
    const ID = this.#convertID(id);
    const hero = this.find(ID);
    if (this.#isNull(hero)) {
      throw new Error('Hero not found');
    }

    let updatedHeroResult: Hero | undefined;
    this.#heroes = this.#heroes.map((hero) => {
      if (hero.id !== ID) {
        return hero;
      }
      updatedHeroResult = {
        ...hero,
        ...updatedHero,
        powerstats: {
          ...hero.powerstats,
          ...updatedHero.powerstats,
        },
      };
      return updatedHeroResult;
    });
    return updatedHeroResult;
  }

  #convertID(id: string | number): number {
    return typeof id === 'string' ? parseInt(id, 10) : id;
  }
  #isNull(hero: Hero): boolean {
    return Object.keys(hero).length === 0;
  }
}
