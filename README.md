# Angular Renaissance Fundamentals Workshop 17+

In this step, we develop the following component:

![Services](/docs/04.01-services-solved.gif)


### Services and Dependency Injection in Angular

In Angular, **services** are a fundamental building block for sharing logic and state across different parts of your application. Services encapsulate reusable business logic, making your codebase more modular, testable, and maintainable.

**Dependency Injection (DI)** is a design pattern that Angular uses to provide services to components or other services. Angular's DI framework allows you to define dependencies at different levels (e.g., application-wide, feature-specific, or component-specific) and automatically resolve and inject them where needed.

#### Key Concepts:
- **Service**: A class that contains reusable logic, typically decorated with `@Injectable()`.
- **Provider**: Configures how a service is created and delivered, defined in the `providers` array of a module, component, or directive.
- **Injector**: The mechanism Angular uses to look up and instantiate dependencies.
- **Scope**: The lifetime of a service instance, determined by where the service is registered:
  - **Root scope** (`providedIn: 'root'`): The service is singleton and available throughout the application.
  - **Feature module scope**: A new instance is created for each feature module that declares the provider.
  - **Component scope**: A new instance is created for each component that declares the provider.

#### Example:
```typescript
@Injectable({
  providedIn: 'root', // Available application-wide
})
export class HeroService {
  get heroes(): Hero[] {
    return HEROES;
  }
}
```

To inject the service into a component:
```typescript
@Component({
  selector: 'app-hero-list',
  template: `...`,
})
export class HeroListComponent {
  constructor(private heroService: HeroService) {}

  fetchHeroes() {
    const heroes = this.heroService.heroes;
    console.log(heroes);
  }
}
```

By leveraging services and DI, Angular applications achieve a clear separation of concerns, reducing tightly coupled code and promoting scalability.


#### Creating Services Using Angular CLI

The Angular CLI simplifies the creation of services, ensuring consistent structure and boilerplate code. To create a new service in the `shared/services/hero` directory, use the following command:

```bash
ng generate service shared/services/hero
```

##### What This Command Does:
1. **Generates two files:**
   - `hero.service.ts`: Contains the service logic.
   - `hero.service.spec.ts`: Contains unit tests for the service.
   
2. **Automatically adds the `@Injectable` decorator with a default configuration:**
   - `providedIn: 'root'`: Makes the service available application-wide as a singleton.

##### Example Output:
```plaintext
CREATE src/app/shared/services/hero.service.ts (137 bytes)
CREATE src/app/shared/services/hero.service.spec.ts (345 bytes)
```

---

#### Key Concepts:
- **Service**: A class that contains reusable logic, typically decorated with `@Injectable()`.
- **Provider**: Configures how a service is created and delivered, defined in the `providers` array of a module, component, or directive.
- **Injector**: The mechanism Angular uses to look up and instantiate dependencies.
- **Scope**: The lifetime of a service instance, determined by where the service is registered:
  - **Root scope** (`providedIn: 'root'`): The service is singleton and available throughout the application.
  - **Feature module scope**: A new instance is created for each feature module that declares the provider.
  - **Component scope**: A new instance is created for each component that declares the provider.

#### Example:
```typescript
@Injectable({
  providedIn: 'root', // Available application-wide
})
export class HeroService {
  get heroes(): Hero[] {
    return HEROES;
  }
}
```

To inject the service into a component:
```typescript
@Component({
  selector: 'app-hero-list',
  template: `...`,
})
export class HeroListComponent {
  readonly #heroService = inject(HeroService);
  constructor() {}

  fetchHeroes() {
    const heroes = this.#heroService.heroes;
    console.log(heroes);
  }
}
```

Official documentation:

- [Services](https://angular.dev/guide/di)

## Code Setup

1. Create a new `hero` service, which should be located in the `shared/services/` directory. Execute the following command:

   - `ng g s shared/services/hero`. This command uses the options `g` (generate) and `s` (service), followed by the services path `shared/services`. The default name for the service is `hero`.
   - Nuestro servicio va a realizar las operaciones de CRUD (Create, Read, Update, Delete) sobre la estructura de datos `heroes`. Por lo tanto, el código del servicio debería ser el siguiente:
  
```typescript
import { Hero, PowerStat } from '../interfaces/hero.interface';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

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

  add(hero: Hero){
    this.heroes.push(hero);
  }
  update(hero: Hero, powerstat: PowerStat, value: number){
    hero.powerstats[powerstat] += value;
  }
  findAll(): Hero[] {
    return this.heroes;
  }
}
```

## Exercises
To develop the workshop exercises, you should have Angular running in development mode. Use the following npm script:

`npm run serve`

Once running, you can develop and see changes in real-time.

Look for the following TODOs in the source code. If you need the solution, switch to the branch with the `-solved` suffix.

- **TODO 401** (`app.component.ts`): Inject the `HeroService` into a private, read-only attribute named `heroService`.  
- **TODO 402** (`app.component.ts`): Store the result of invoking the `findAll()` method from the `HeroService` in a variable named `heroes`.  
- **TODO 403** (`app.component.ts`): Call the `add` method of the `HeroService`.  
- **TODO 404** (`hero-list.component.ts`): Inject the `HeroService` into a private, read-only attribute.  
- **TODO 405** (`hero-list.component.ts`): Update the code to invoke the `update` method of the `heroService`.

Enjoy your coding journey
