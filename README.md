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

- **TODO 210** (`hero-list.component.html`) Bind the `(powerstatsChange)` event of each `app-hero-item` component and associate it with a handler named `savePowerstats`, which receives an object of type `HeroPowerStatsChange` as a parameter.  
  - The `savePowerstats` handler should update the `powerstat` property in the set of `powerstats` for each `hero` using the `value` received in the object.  
- **TODO 211** (`hero-item.component.ts`) Add the `powerstatsChange` property using the `output` function and type it with `HeroPowerStatsChange`.  
- **TODO 212** (`hero-item.component.ts`) Modify the `decrementPowerStats` method so that it emits the object to `HeroListComponent` through the `powerstatsChange` property.
```
{
    hero: this.hero,
    powerstat,
    value: -1,
}
```
- **TODO 213** (`hero-item.component.ts`) Modify the `incrementPowerStats` method so that it emits the object to `HeroListComponent` through the `powerstatsChange` property.

```
{
    hero: this.hero,
    powerstat,
    value: 1,
}
```

Enjoy your coding journey
