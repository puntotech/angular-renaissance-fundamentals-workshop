# Angular Renaissance Fundamentals Workshop 17+

In this step, we develop the following component:

![Single Component](/docs/01.01-single-component-solved.gif)

## Standalone Components

A component is a `building block` in Angular. Each component defines a class containing application data and logic, and it is associated with an HTML template that defines a view to be displayed in a target environment.

Official documentation:

- [https://angular.dev/guide/components](https://angular.dev/guide/components)
- [https://angular.dev/guide/templates](https://angular.dev/guide/templates)

Each `Hero` is defined by the following attributes:

```typescript
export interface Hero {
  id: number;
  name: string;
  image: string;
  alignment: "good" | "bad";
  powerstats: PowerStats;
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
```

## Code Setup

In this initial section, instead of providing the component pre-created, the component will be built using Angular CLI. However, the relevant HTML, CSS, and TS files are provided to start the workshop.

1. Create a new `hero-item` component, which should be located in the `components/hero-item/` directory. Execute the following command:
   
   - `ng g c components/hero-item`. This command uses the options `g` (generate) and `c` (component), followed by the component path `components/hero-item`. The default name for the component is `hero-item`.
   - Remove all default content from the `app.component` and include the newly created component `<app-hero-item/>` in the HTML.
   - Import the `HeroItemComponent` into the `app.component.ts`. Also, remove the `RouterOutlet` import since we are not using the router yet.
```typescript
import { Component } from '@angular/core';
import { HeroItemComponent } from './components/hero-item/hero-item.component';

@Component({
  selector: 'app-root',
  imports: [HeroItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-renaissance-fundamentals-workshop';
}
```

2. Prepare the HTML, CSS, and data to complete the exercises.
   - Create the template for your component (`hero-item.component.html`). The HTML skeleton and CSS class assignments for each element are provided.

  ```html
  <!-- TODO 108: Logic to show one class or another -->
  <div class="hero-item">
    <div class="image">
      <!-- TODO 101: Bind the src attribute -->
      <img src="hero.image" />
    </div>
    <div class="details">
      <div class="hero-name"><!-- TODO 102: Display the hero's name --></div>
      <div class="hero-powerstats">
        <span>
          Intelligence:
          <!-- TODO 103: Display intelligence -->
        </span>
        <div class="hero-powerstats-buttons">
          <!-- TODO 105: Create +/- buttons to call decrementPowerStats or incrementPowerStat methods for intelligence. 
          Disable buttons for decreasing when intelligence is 0 and for increasing when intelligence is 100. -->
        </div>
      </div>
      <div class="hero-powerstats">
        <span>
          Strength:
          <!-- TODO 106: Same as TODO 103 but for strength -->
        </span>
        <div class="hero-powerstats-buttons">
          <!-- TODO 106: Same as TODO 105 but for strength -->
        </div>
      </div>
      <div class="hero-powerstats">
        <span>
          Speed:
          <!-- TODO 106: Same as TODO 103 but for speed -->
        </span>
        <div class="hero-powerstats-buttons">
          <!-- TODO 106: Same as TODO 105 but for speed -->
        </div>
      </div>
      <div class="hero-powerstats">
        <span>
          Durability:
          <!-- TODO 106: Same as TODO 103 but for durability -->
        </span>
        <div class="hero-powerstats-buttons">
          <!-- TODO 106: Same as TODO 105 but for durability -->
        </div>
      </div>
      <div class="hero-powerstats">
        <span>
          Power:
          <!-- TODO 106: Same as TODO 103 but for power -->
        </span>
        <div class="hero-powerstats-buttons">
          <!-- TODO 106: Same as TODO 105 but for power -->
        </div>
      </div>
      <div class="hero-powerstats">
        <span>
          Combat:
          <!-- TODO 106: Same as TODO 103 but for combat -->
        </span>
        <div class="hero-powerstats-buttons">
          <!-- TODO 106: Same as TODO 105 but for combat -->
        </div>
      </div>
    </div>
  </div>
  ```

   - Next, style the component in `hero-item.component.scss`. The CSS styles are provided below:
  
```scss
.hero-item {
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    display: inline-block;

    .details {
      text-align: center;
    }

    &.hero-villain {
      background-color: rebeccapurple;
    }

    .hero-name {
      font-weight: bolder;
      font-size: 1.4rem;
    }
    .hero-powerstats {
      display: flex;
      justify-content: space-between;
    }
}
```

   - Define the superhero objects using a TypeScript interface. Create a file `app/shared/interfaces/hero.interface.ts` with the following content:

```typescript
export interface Hero {
  id: number;
  name: string;
  image: string;
  alignment: "good" | "bad";
  powerstats: PowerStats;
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
```

  - Review the properties for each superhero, which include simple attributes, as well as powerstats that consist of various properties such as `intelligence`, `strength`, `speed`.
  - Finally, create a temporary object in the component that matches the interface. Add the following to `hero-item.component.ts`:

```typescript
import { Hero, PowerStat } from '../../shared/interfaces/hero.interface';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.scss']
})
export class HeroItemComponent {
  public hero : Hero = {
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
  };

  /* TODO 107: Create isHeroVillain to check if the hero's alignment is "bad" */

  decrementPowerStats(powerstat: PowerStat): void{
    /*
    * TODO 104: Check if the powerstat is greater than 0 and decrement it.
    */
  }

  incrementPowerStats(powerstat: PowerStat): void{
    /*
    * TODO 104: Check if the powerstat is less than 100 and increment it.
    */
  }
}
```

## Exercises
To develop the workshop exercises, you should have Angular running in development mode. Use the following npm script:

`npm run serve`

Once running, you can develop and see changes in real-time.

Look for the following TODOs in the source code. If you need the solution, switch to the branch with the `-solved` suffix.

- **TODO 101** (`hero-item.component.html`) Bind the `src` attribute of the `img` element.
- **TODO 102** (`hero-item.component.html`) Display the hero's name.
- **TODO 103** (`hero-item.component.html`) Display the hero's intelligence.
- **TODO 104** (`hero-item.component.ts`)
  - Check if the `powerstat` is less than 100 and increment it.
  - Check if the `powerstat` is greater than 0 and decrement it.
- **TODO 105** (`hero-item.component.html`) Create +/- buttons to invoke `decrementPowerStats` or `incrementPowerStat` methods for `intelligence`. Disable buttons for decrementing when `intelligence` is 0 and for incrementing when `intelligence` is 100.
- **TODO 106** (`hero-item.component.html`) Same as TODO 104 and TODO 105, applied to `speed`, `strength`, `durability`, `power`, and `combat`.
- **TODO 107** (`hero-item.component.ts`): Create the `isHeroVillain` property to check if a hero's `alignment` is `"bad"` and return `true` for `"bad"` or `false` otherwise.
- **TODO 108** (`hero-item.component.html`) Bind the class attribute of the parent `div` so that if `isHeroVillain` is `true`, the CSS classes `hero-item hero-villain` are applied. If `false`, apply only `hero-item`.

Enjoy your coding journey.
