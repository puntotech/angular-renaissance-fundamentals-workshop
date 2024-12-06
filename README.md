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

1. Create a new `hero-list` component, which should be located in the `components/hero-list/` directory. Execute the following command:
   
   - `ng g c components/hero-list`. This command uses the options `g` (generate) and `c` (component), followed by the component path `components/hero-list`. The default name for the component is `hero-list`. 
   - The content of the template should be as follows:

```html
<div class="hero-list">
  <app-hero-item></app-hero-item>
  <app-hero-item></app-hero-item>
  <app-hero-item></app-hero-item>
</div>
```

2. The `hero-list.component.ts` must import the child component `HeroItemComponent` to use it. Additionally, we will create an array of three heroes/villains in the `HeroListComponent`. This means that the data for each hero will not reside in the `HeroItemComponent` code. Therefore, the `hero-list.component.ts` file should look like this:
  
```typescript
import { Component } from '@angular/core';
import { Hero } from '../../shared/interfaces/hero.interface';
import { HeroItemComponent } from '../hero-item/hero-item.component';

@Component({
  selector: 'app-hero-list',
  imports: [HeroItemComponent],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent {
  public heroes: Hero[] = [
    {
      id: 620,
      name: "Spider-Man",
      powerstats: {
        intelligence: 90,
        strength: 55,
        speed: 67,
        durability: 75,
        power: 74,
        combat: 85
      },
      image: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/620-spider-man.jpg',
      alignment: "good",
    },
    {
      id: 225,
      name: "Doctor Octopus",
      powerstats: {
        intelligence: 94,
        strength: 48,
        speed: 33,
        durability: 40,
        power: 53,
        combat: 65
      },
      image: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/225-doctor-octopus.jpg",
      alignment: "bad",
    },
    {
      id: 70,
      name: "Batman",
      powerstats: {
        intelligence: 100,
        strength: 26,
        speed: 27,
        durability: 50,
        power: 47,
        combat: 100
      },
      image: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/70-batman.jpg",
      alignment: "good",
    },
  ];
}
```
   3. To conclude, we just need to add a CSS rule to style the hero list. Therefore, the file `hero-list.component.scss` would look as follows:
   
```scss
.hero-list {
  display: flex;
  gap: 1rem;
}
```

  - The application we are currently developing should not display the `HeroItemComponent` upon startup but should instead start with the `HeroListComponent`. Therefore, in the `app.component.html` template, we need to replace it with the following:
  
```html
<app-hero-list/>
```
   - Finally, we must also update the import of the `HeroListComponent` in the `app.component.ts` file.
  
```typescript
import { Component } from '@angular/core';
import { HeroListComponent } from './components/hero-list/hero-list.component';

@Component({
  selector: 'app-root',
  imports: [HeroListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-renaissance-fundamentals-workshop';
}
```

## Exercises
To develop the workshop exercises, you should have Angular running in development mode. Use the following npm script:

`npm run serve`

Once running, you can develop and see changes in real-time.

Look for the following TODOs in the source code. If you need the solution, switch to the branch with the `-solved` suffix.

- **TODO 201** (`hero-list.component.ts`) Bind the [hero] attribute of each app-hero-item component to each object in the heroes array.
- **TODO 202** (`hero-item.component.ts`) Modify the hero object so that instead of being defined within the HeroItem component, it is received as an input of type `Required<Hero>`.
- **TODO 203** (`hero-item.component.ts`) Modify this.hero to access the value of the signal by using this.hero()
- **TODO 204** (`hero-item.component.html`) Modify this.hero to access the value of the signal by using this.hero()
- **TODO 205** (`hero-item.component.ts`) Update isHeroVillain to be a computed signal instead of a boolean value.
- **TODO 205** (`hero-item.component.html`) Access the value of the isHeroVillain signal by replacing hero with isHeroVillain().

Enjoy your coding journey
