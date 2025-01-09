export interface Hero {
  id: number;
  name: string;
  image: string;
  powerstats: PowerStats;
  alignment: alignments;
}

export interface PowerStats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}

export type PowerStat = keyof PowerStats;

export type alignments = "good" | "bad" ;
