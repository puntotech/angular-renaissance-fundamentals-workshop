# Angular Renaissance Fundamentals Workshop 17+

In this step, we develop the following web:

![Router-params](/docs/07.02-http-solved.gif)


# Backend

In the workshop, it is necessary to have a backend that powers our frontend application. For the purposes of this workshop, a backend developed in Node.js has been provided, located in the `api` directory. The API does not persist data in a database but stores it in RAM. Therefore, every time the backend restarts, its data will reset.

To run the API, you can execute it independently by following these steps:

1. `cd api`
2. `npm i`
3. `npm start:dev`

Alternatively, if you run the npm script `npm start`, the API will start concurrently with the Angular web application.


## Scripts

- **`start`**: Starts the server in production mode using `ts-node` to execute the `server.ts` file.
  ```bash
  npm start
  ```
- **`start:dev`**: Starts the server in development mode using `nodemon` to automatically restart the server when file changes are detected.
  ```bash
  npm run start:dev
  ```

The server will start at `http://localhost:9000`.



## Endpoints

### Heroes

- `GET /heroes`: Retrieves all heroes.
- `GET /heroes?limit={L}&page={P}`: Retrieves a subset of heroes paginated, where `L` is the number of heroes to retrieve, and `P` is the page number.
- `GET /heroes/:id`: Retrieves a hero by ID.
- `POST /heroes`: Creates a new hero.
- `PATCH /heroes/:id`: Updates a hero by ID.
- `DELETE /heroes/:id`: Deletes a hero by ID.
- `PUT /heroes/:id`: Updates a hero by ID.

### Users

- `POST /login`: Logs in a user.
- `POST /register`: Registers a new user.

---


# Using `signal` as State Management Instead of `BehaviorSubject`

With the introduction of Signals in Angular, managing state has become more intuitive and reactive. Signals offer a modern approach to handling and propagating changes in your application. Unlike `BehaviorSubject`, which is an RxJS construct, Signals are part of Angular's reactivity system, natively designed to simplify state management.

---

## **1. What is a Signal?**

A **Signal** is a reactive primitive in Angular that holds a value and notifies subscribers whenever the value changes. Signals are read and write properties that can manage state without requiring an Observable or manual subscription logic.

Key Benefits of Signals:
- **Simpler API:** No need for Observables or manual unsubscription.
- **Immediate Reactivity:** Updates propagate immediately, without needing intermediate steps like emitting new values.
- **Integrated with Angular:** Signals are tightly coupled with Angular's change detection, making them efficient and easy to use.

---


## **2. When to Use Signals**

| Use Case                                  | Recommended Approach   |
|------------------------------------------|------------------------|
| Storing and managing local state          | **Signal**             |
| Sharing state across multiple components  | **Signal**             |
| Complex reactive streams or event handling | **RxJS Observables**   |

---

## **3. Creating and Using Signals**

To manage state with Signals, you define a `signal` and use methods like `set`, `update`, and `effect` for manipulation and reaction to changes.

**Example: Managing Counter State with Signals**

```typescript
import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  // Define the signal with an initial value
  counter = signal(0);

  // Method to increment the counter
  increment() {
    this.counter.update((current) => current + 1);
  }

  // Method to decrement the counter
  decrement() {
    this.counter.update((current) => current - 1);
  }

  // Method to reset the counter to a specific value
  reset(value: number) {
    this.counter.set(value);
  }
}
```

**Component Example:**

```typescript
import { Component } from '@angular/core';
import { StateService } from './state.service';

@Component({
  selector: 'app-counter',
  template: `
    <div>Current Value: {{ counter() }}</div>
    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>
    <button (click)="reset()">Reset</button>
  `,
})
export class CounterComponent {
  counter = this.stateService.counter;

  constructor(private stateService: StateService) {}

  increment() {
    this.stateService.increment();
  }

  decrement() {
    this.stateService.decrement();
  }

  reset() {
    this.stateService.reset(0);
  }
}
```

---

## **4. Methods for Managing Signals**

Angular Signals provide the following methods for state management:

| **Method**      | **Purpose**                                                                                  | **Example**                                                                                   |
|------------------|----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `signal`         | Creates a Signal with an initial value.                                                     | `counter = signal(0);`                                                                        |
| `set`            | Replaces the Signal's value with a new one.                                                 | `this.counter.set(10);`                                                                       |
| `update`         | Transforms the Signal's value based on its current value.                                   | `this.counter.update((current) => current + 1);`                                              |
| `effect`         | Defines an effect that runs when the Signal's value changes.                                | `effect(() => console.log(this.counter()));`                                                  |

#### **1. `signal`**
The `signal` function is used to initialize a Signal with a default value.

```typescript
counter = signal(0); // Initialize a signal with the value 0
```

#### **2. `set`**
The `set` method replaces the Signal's current value.

- **Use Case:** When you need to reset or replace the state completely.

```typescript
resetCounter() {
  this.counter.set(0); // Replace the current value with 0
}
```

#### **3. `update`**
The `update` method transforms the Signal's value based on its current state.

- **Use Case:** When the new value depends on the existing value.

```typescript
incrementCounter() {
  this.counter.update((current) => current + 1); // Increment the counter by 1
}
```

#### **4. `effect`**
The `effect` method creates a reactive effect that runs whenever the Signal's value changes.

- **Use Case:** When you need to perform side effects (e.g., log changes, sync state).

```typescript
constructor() {
  effect(() => {
    console.log('Counter value:', this.counter());
  });
}
```

---

### **When to Use Each Method**

| **Method** | **When to Use**                                                                                     | **Example**                                                                               |
|------------|-----------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| `set`      | To replace the state completely, often during resets or assignments.                                | `this.counter.set(0);`                                                                   |
| `update`   | When the new value depends on the previous value, such as incrementing counters or updating objects. | `this.counter.update((current) => current + 1);`                                         |
| `effect`   | For performing side effects like logging, syncing data, or triggering other changes.                | `effect(() => console.log(this.counter()));`                                             |

---


## **5. Replacing `BehaviorSubject` with Signals**

Here’s how to refactor a service using `BehaviorSubject` into one using Signals:

**BehaviorSubject Implementation:**

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private counterSubject = new BehaviorSubject<number>(0);
  counter$ = this.counterSubject.asObservable();

  increment() {
    this.counterSubject.next(this.counterSubject.value + 1);
  }

  decrement() {
    this.counterSubject.next(this.counterSubject.value - 1);
  }

  reset(value: number) {
    this.counterSubject.next(value);
  }
}
```

**Signal-Based Implementation:**

```typescript
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  counter = signal(0);

  increment() {
    this.counter.update((current) => current + 1);
  }

  decrement() {
    this.counter.update((current) => current - 1);
  }

  reset(value: number) {
    this.counter.set(value);
  }
}
```


### **Advantages of Using Signals Over `BehaviorSubject`**

1. **Less Boilerplate:** Signals require fewer lines of code and are easier to understand.
2. **Seamless Integration:** Signals integrate directly with Angular templates, eliminating the need for pipes like `async`.
3. **Built-In Reactivity:** No need for manual subscription or unsubscription.


---

## **6. Using `effect` for Side Effects**

The `effect` function is a powerful tool to react to changes in a signal. It is especially useful for triggering side effects, such as logging or syncing with external systems.

**Example: Logging State Changes**

```typescript
import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  counter = signal(0);

  constructor() {
    // Log the counter value whenever it changes
    effect(() => console.log('Counter value:', this.counter()));
  }

  increment() {
    this.counter.update((current) => current + 1);
  }
}
```

---


### Summary

- **Signals** simplify state management in Angular with a modern, intuitive API.
- Use `set` for direct assignments, `update` for transformations, and `effect` for reacting to changes.
- Signals integrate seamlessly with Angular’s reactivity model, making them a great alternative to `BehaviorSubject` for state management.

By leveraging Signals, you can write cleaner, more maintainable code while reducing dependency on RxJS for state management tasks.

---

Official documentation:

- [Http](https://angular.dev/guide/http)
- [Signal](https://angular.dev/guide/signals)


## Exercises
To develop the workshop exercises, you should have Angular running in development mode. Use the following npm script:

`npm run serve`

Once running, you can develop and see changes in real-time.

Look for the following TODOs in the source code. If you need the solution, switch to the branch with the `-solved` suffix.


- **TODO 730** (`shared/services/hero.service.ts`)
  - Replace the `#heroesSubject` property with `#heroesSignal`.
  - Replace the `heroes$` property with `heroes` (computed from `this.#heroSubject`). 
- **TODO 731** (`shared/services/hero.service.ts`)
  - Replace the `heroesSubject` property with  `heroesSignal`
- **TODO 731** (`pages/home`) Change `heroes$` to be `heroes` signal from the service.
- **TOOD 732-735** (`shared/services/hero.service.ts`) Replace the `heroesSubject` property with `heroesSignal`.
- **TODO 736** (`pages/heor/hero-detail.component.ts`)
  - Replace the observable with a `hero` signal with initial value `NullHero` from `heroService`.
  - Replace `ngOnChanges` to constructor in which you subscribe to the hero service inside the  effect (signal).
  - Use the operator `takeUntilDestroyed` to unsubscribe from the observable when the component is destroyed.
  - Use the hero signal to display the hero in the template. 

Enjoy your coding journey
