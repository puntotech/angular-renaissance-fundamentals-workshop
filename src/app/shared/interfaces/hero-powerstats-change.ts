import { Hero, PowerStat } from "./hero.interface";

export interface HeroPowerstatsChange {
  hero: Hero;
  powerstat: PowerStat;
  value: number;
}
