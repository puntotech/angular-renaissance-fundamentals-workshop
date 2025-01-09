import { Hero, PowerStats, alignments } from "./hero.interface";

export class HeroDTO {

  #id: number;
  #name: string;
  #image: string;
  #alignment: alignments;
  #powerstats: PowerStats;


  fromJSON(hero: any){
    this.#id = hero?.id ?? -1;
    this.#name = hero?.name ?? 'unknown';
    this.#alignment = hero?.alignment ?? 'bad';
    this.#image = hero?.image ?? 'assets/img/hero-not-found.png';
    this.#powerstats = hero?.powerstats ?? { intelligence: 0, strength: 0, speed: 0, durability: 0, power: 0, combat: 0 };
    return this;
  }
  toJSON(){
    return {
      id: this.#id,
      name: this.#name,
      image: this.#image,
      alignment: this.#alignment,
      powerstats: this.#powerstats,
    }
  }
}



