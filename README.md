# Angular Renaissance Fundamentals Workshop 17+

In this step, we develop the following component:

![Several Component](/docs/02.01-communication-solved.gif)

## Communication between components

A common pattern in components' hierarchy is sharing data between parent components and one or more child components.

This pattern is implemented using the `input()` and `output()` functions.

Official documentation:

- [https://angular.dev/guide/components/inputs](https://angular.dev/guide/components/inputs)
- [https://angular.dev/guide/components/outputs](https://angular.dev/guide/components/outputs)

## Code Setup

1. Create a new interface in the path `shared/interfaces/hero-powerstats-change.ts`, which will contain the information that the `HeroItemComponent` components will send to the parent component `HeroListComponent` when a click occurs on any of the buttons in the card. The transmitted information will include the `hero` object that was clicked, the `powerstat` that was pressed, and a value of `1` or `-1` to indicate whether the skill has been incremented or decremented.


```typescript
import { Hero, PowerStat } from "./hero.interface";

export interface HeroPowerstatsChange {
  hero: Hero;
  powerstat: PowerStat;
  value: number;
}
```
   

## Exercises
To develop the workshop exercises, you should have Angular running in development mode. Use the following npm script:

`npm run serve`

Once running, you can develop and see changes in real-time.

Look for the following TODOs in the source code. If you need the solution, switch to the branch with the `-solved` suffix.

- **TODO 220** (`hero-list.component.html`) Iterate using `@for` to create as many `app-hero-item` components as there are heroes in the `heroes` array. Additionally, if no heroes exist, a message indicating that no heroes are available should be displayed. 
- **TODO 221** (`hero-item.component.html`) Iterate over all the `powerstats` of each hero so that the same HTML code doesn't need to be repeated for each property.    
- **TODO 222** (`hero-item.component.html`) Use the `titlecase` pipe to transform the name of each powerstat so it starts with an uppercase letter (**TODO 221** must be completed first).
- **TODO 223** (`hero-item.component.html`) If the hero is a villain, include the following emoji 🦹 next to their name. Otherwise, display this emoji 🦸.

Enjoy your coding journey
