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

### Understanding RxJS in Angular

RxJS (**Reactive Extensions for JavaScript**) is a powerful library for handling asynchronous operations and event-based data through **Observables**, which are a fundamental part of Angular. When working with Angular's `HttpClient` module, RxJS allows us to handle HTTP requests efficiently and reactively.

In this section, we'll cover the essentials of RxJS to understand how it works with Angular and how to handle HTTP requests effectively.

---

#### What is an Observable?

An **Observable** is a stream of data that can emit values over time. It's like a sequence that can emit multiple events (data) either synchronously or asynchronously. In Angular, many APIs are based on observables, such as HTTP requests, form events, or change detection (**It is now changing to Signal**).

```typescript
import { Observable } from 'rxjs';

const myObservable = new Observable((observer) => {
  observer.next('Hello'); // Emit a value
  observer.next('DotTech');  // Emit another value
  observer.complete();    // Complete the stream
});
```

To consume an Observable, we use the **`subscribe`** method, which acts as an observer and responds to the emitted values.

```typescript
myObservable.subscribe({
  next: value => console.log(value), // Handle each emitted value
  complete: () => console.log('Completed') // Called when the stream completes
});
```

Output:
```
Hello
DotTech
Completed
```

---

#### RxJS and Angular

Angular's `HttpClient` module uses observables to handle HTTP requests. For example, a `GET` request to a server returns an observable that emits the data received when the request is successful.

```typescript
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
})
export class ExampleComponent {
  constructor(private http: HttpClient) {}

  fetchData() {
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe({
      next: data => console.log(data), // Handle the received data
      error: err => console.error('Error:', err), // Handle errors
      complete: () => console.log('Request complete') // Optional
    });
  }
}
```

---

#### The `unsubscribe` Problem

When you subscribe to an Observable, it stays active until:
1. It completes (e.g., `observer.complete()`).
2. An error occurs.
3. You manually cancel it using **`unsubscribe()`**.

The problem occurs if you don’t unsubscribe from an Observable that doesn’t complete automatically (such as events or continuous streams). This can lead to memory leaks, especially if the component is destroyed but the Observable remains active.

##### Solution: Handling Unsubscription

There are several ways to manage this in Angular:

1. **Manual Unsubscription**:
   If you're manually subscribing, you can store the subscription and unsubscribe in the `ngOnDestroy` lifecycle hook.

   ```typescript
   private subscription!: Subscription;

   fetchData() {
     this.subscription = this.http.get('https://jsonplaceholder.typicode.com/posts')
       .subscribe(data => console.log(data));
   }

   ngOnDestroy() {
     if (this.subscription) {
       this.subscription.unsubscribe();
     }
   }
   ```

2. **Using the `takeUntil` Operator**:
   This operator emits values until a second observable emits a value, allowing automatic completion of subscriptions.
   ```typescript
   import { Subject } from 'rxjs';
   import { takeUntil } from 'rxjs/operators';

   export class ExampleComponent implements OnDestroy {
     private destroy$ = new Subject<void>();

     fetchData() {
       this.http.get('https://jsonplaceholder.typicode.com/posts')
         .pipe(takeUntil(this.destroy$))
         .subscribe(data => console.log(data));
     }

     ngOnDestroy() {
       this.destroy$.next();
       this.destroy$.complete();
     }
   }
   ```

3. **Using the `async` Pipe**:
   When consuming an observable in the template, the `async` pipe automatically handles subscription and unsubscription.
   ```typescript
   posts$ = this.http.get('https://jsonplaceholder.typicode.com/posts');
   ```
   In the template:
   ```html
   @for(post of posts$ | async){
    <div>
      {{ post.title }}
    </div>
   }
   ```

¡Tienes toda la razón de nuevo! **`takeUntilDestroy`** es una característica nativa de **`@angular/core`** a partir de Angular 16, y no de una librería externa. Mi error en la referencia. Gracias por la corrección.

Aquí te dejo la versión corregida con la información correcta:

### 4. **Using the `takeUntilDestroy` Operator**

In Angular 16+, the **`takeUntilDestroy`** operator is a built-in feature that allows for automatic unsubscription when a component is destroyed. It is part of **`@angular/core`** and helps manage the lifecycle of subscriptions efficiently, preventing memory leaks.


1. **Import `takeUntilDestroy` and `UntilDestroy` decorator** from `@angular/core`:
   ```typescript
   import { Component, OnInit } from '@angular/core';
   import { HttpClient } from '@angular/common/http';
   import { takeUntilDestroy, UntilDestroy } from '@angular/core';
   import { Observable } from 'rxjs';

   @UntilDestroy()
   @Component({
     selector: 'app-example',
     templateUrl: './example.component.html',
   })
   export class ExampleComponent implements OnInit {
     posts$!: Observable<any[]>;

     constructor(private http: HttpClient) {}

     ngOnInit(): void {
       this.posts$ = this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts')
         .pipe(takeUntilDestroy(this));
     }
   }
   ```

#### How It Works:

- **Automatic Unsubscription**: When the component is destroyed (e.g., when navigating away from the page), `takeUntilDestroy` will automatically unsubscribe from the observable, preventing memory leaks.
- **Simplified Code**: By using `takeUntilDestroy`, you eliminate the need for `ngOnDestroy` or manually unsubscribing from observables.


### Comparing Promises, RxJS, and Signals in Angular

In Angular, there are several ways to handle asynchronous and reactive data, depending on the use case. The most common approaches are **RxJS (Observables)**, **Promises**, and, in Angular 16 and above, **Signals**. Each has its strengths and weaknesses, and it's important to understand when to use each one.


#### 1. **Promises**

**Promises** are a simpler way to handle asynchronous tasks that happen once, such as an HTTP request or reading a file.

| Feature                        | Description                                                                                          |
|---------------------------------|------------------------------------------------------------------------------------------------------|
| **Reactivity**                  | Not reactive: handles only a single emission of data.                                                |
| **Composition**                 | Allows chaining operations with `.then()` and handling errors with `.catch()`.                       |
| **Cancellation**                | Does not support direct cancellation.                                                                |
| **Complexity**                  | Easy to use for simple operations.                                                                   |

**Example with Promises:**
```typescript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

---

#### 2. **RxJS (Observables)**

RxJS is ideal for handling continuous data streams, complex asynchronous operations, and event handling.

| Feature                        | Description                                                                                          |
|---------------------------------|------------------------------------------------------------------------------------------------------|
| **Reactivity**                  | Allows handling continuous data streams or multiple emissions of data.                               |
| **Composition**                 | Provides operators like `map`, `filter`, and `mergeMap` to transform and combine data easily.        |
| **Cancellation**                | Supports cancellation of streams with `unsubscribe`, which prevents memory leaks.                    |
| **Complexity**                  | Can be more complex due to the large number of available operators and handling of reactive flows.    |

**Example with Observables (RxJS):**
```typescript
this.http.get('https://api.example.com/data').subscribe(data => {
  console.log(data);
});
```

---

#### 3. **Signals**

**Signals** are a reactive state management system introduced in Angular 16 for handling reactive state. They are designed to be simple and highly optimized.

| Feature                        | Description                                                                                          |
|---------------------------------|------------------------------------------------------------------------------------------------------|
| **Reactivity**                  | Great for managing reactive state in applications.                                                  |
| **Composition**                 | Does not include advanced operators like RxJS, but works well with simple structures.                |
| **Cancellation**                | Does not apply directly because Signals are not meant for continuous streams like RxJS.              |
| **Complexity**                  | Very easy to use, ideal for handling state without the need for manual subscriptions.                |

**Example with Signals:**
```typescript
import { signal } from '@angular/core';

const dataSignal = signal([]);

fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => dataSignal.set(data));

@for(item of dataSignal; track item.id){
  <div>
    {{ item.name }}
  </div>
}
```

---

### Summary Comparison

| Feature                    | **RxJS (Observables)**                            | **Promises**                         | **Signals**                          |
|----------------------------|--------------------------------------------------|--------------------------------------|--------------------------------------|
| **Main Use Cases**          | Continuous data streams, complex asynchronous operations, event handling | Single operations like HTTP requests | Reactive state management            |
| **Reactivity**              | Yes                                              | No                                   | Yes                                  |
| **Cancellation**            | Yes, with `unsubscribe`                          | No                                   | Does not apply                       |
| **Transformation**          | Full (advanced operators available)              | Limited (`.then`, `.catch`)          | Basic (direct mutations only)        |
| **Ease of Use**             | Medium/High (requires learning RxJS)             | High                                 | Very High                            |
| **Reactive State Management** | Not native (uses `BehaviorSubject` if needed)    | No                                   | Yes                                  |

---

### Which One to Use and When?

| Use Case                                             | Recommendation                |
|------------------------------------------------------|------------------------------|
| Simple HTTP requests                                 | **Promises**    |
| Continuous event streams (sockets, streams, etc.)    | **RxJS**                     |
| Reactive state management in components             | **Signals**                  |
| Complex data transformations and combinations       | **RxJS**                     |
| You prefer a simple and declarative approach        | **Signals**                  |

---

### Summary

- **RxJS** is the most powerful and flexible option for handling asynchronous operations and continuous data streams but can be more complex to use.
- **Promises** are perfect for simple, one-off operations like HTTP requests.
- **Signals** are ideal for handling reactive state in Angular 16+ applications.

With this comparison, you can choose the right tool for each situation in your Angular application. 🚀

---

Official documentation:

- [Http](https://angular.dev/guide/http)

## Code Setup

1. Crea una clase abstracta que definirá los métodos y algunos atributos de nuestro servicio (o servicios si tuviéramos diferentes). Esta clase abstracta estará en la ruta `shared/services/hero.service.abstract.ts` y tendrá el siguiente contenido: 

```typescript
import { Hero, PowerStats } from '../interfaces/hero.interface';

import { Observable } from 'rxjs';

export abstract class HeroServiceAbstract {
  protected readonly API_ENDPOINT = 'http://localhost:9000/heroes';


  readonly defaultHero: Hero = {
    id: Math.floor(Math.random() * 10000) + 1000,
    name: 'Joker',
    image: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/370-joker.jpg",
    alignment: 'bad',
    powerstats: {
      intelligence: 100,
      strength: 10,
      speed: 12,
      durability: 60,
      power: 43,
      combat: 70,
    },
  };
  readonly NullHero: Hero = {
    id: Math.floor(Math.random() * 10000) + 1000,
    name: 'Not Found',
    image: './assets/img/hero-not-found.png',
    alignment: 'bad',
    powerstats: {
      intelligence: -1,
      strength: -1,
      speed: -1,
      durability: -1,
      power: -1,
      combat: -1,
    },
  };

  abstract load(cache?: boolean): Observable<{ heroes: Hero[]; total: number }>;
  abstract add(hero: Partial<Hero>): Observable<Hero>;
  abstract update(heroToUpdate: Hero): Observable<Hero>;
  abstract remove(hero: Hero): Observable<Hero>;
  abstract updatePowerstat(hero: Hero, powerstat: keyof PowerStats, value: number): Observable<Hero>;
  abstract findAll(params?: { page: number; limit: number }): Observable<{ heroes: Hero[]; total: number }>;
  abstract findOne(id: number): Observable<Hero>;

  isDefaultHero(hero: Hero): boolean {
    return hero.id === this.defaultHero.id;
  }
  isNullHero(hero: Hero): boolean {
    return hero.id === this.NullHero.id;
  }
}
```


## Exercises
To develop the workshop exercises, you should have Angular running in development mode. Use the following npm script:

`npm run serve`

Once running, you can develop and see changes in real-time.

Look for the following TODOs in the source code. If you need the solution, switch to the branch with the `-solved` suffix.

- **TODO 710** (`app.config.ts`): Configure `provideHttpClient`.
- **TODO 711** (`shared/services/hero.service.ts`) 
  - Extend the class to the abstract class `HeroServiceAbstract`.
  - Remove all properties since the data will no longer be in the service.
- **TODO 712** (`shared/services/hero.service.ts`) Inject the `httpClient` service into a private, read-only property called `httpClient`.
- **TODO 713** (`shared/services/hero.service.ts`) Create the `load` method, which connects to `this.API_ENDPOINT` using the `get` verb.
- **TODO 714** (`shared/services/hero.service.ts`) 
  - Update the `add` method to use the httpClient to post a new hero to the API_ENDPOINT.
- **TODO 714** (`pages/hero/hero-new/hero-new.component.ts`) 
  - Update the method `add` to subscribe to the service and navigate to the home page.
  - Use the operator `takeUntilDestroyed` to avoid memory leaks (import it from `'@angular/core/rxjs-interop'`).
  - Inject and use the `DestroyRef` service to destroy the subscription when the component is destroyed.
- **TODO 715** (`shared/services/hero.service.ts`) 
  - Update the `update` method to use the httpClient to put a hero to the `API_ENDPOINT`.
- **TODO 715** (`pages/hero/hero-update/hero-update.component.ts`) 
  - Update the method `update` to subscribe to the service and navigate to the home page.
  - Use the operator `takeUntilDestroyed` to avoid memory leaks (import it from `'@angular/core/rxjs-interop'`).
  - Inject and use the `DestroyRef` service to destroy the subscription when the component is destroyed.

- **TODO 716** (`shared/services/hero.service.ts`) 
  - Update the `savePowerstats` method to use the `httpClient` to put a hero to the `API_ENDPOINT`.
- **TODO 716** (`pages/hero/hero-list/hero-list.component.ts`) 
  - Update the method `savePowerstats` to subscribe to the service.
  - Use the operator `takeUntilDestroyed` to avoid memory leaks (import it from `'@angular/core/rxjs-interop'`).
  - Inject and use the `DestroyRef` service to destroy the subscription when the component is destroyed.

- **TODO 717** (`shared/services/hero.service.ts`) 
  - Update the `remove` method to use the `httpClient` to delete a hero to the `API_ENDPOINT`.
- **TODO 717** (`pages/hero/hero-list/hero-list.component.ts`) 
  - Update the method `removeHero` to subscribe to the service.
  - Use the operator `takeUntilDestroyed` to avoid memory leaks (import it from `'@angular/core/rxjs-interop'`).
  - Inject and use the `DestroyRef` service to destroy the subscription when the component is destroyed.
  
- **TODO 718** (`shared/services/hero.service.ts`) 
  - Update the `findOne` method to use the `httpClient` to find a hero to the `API_ENDPOINT`.
- **TODO 718** (`pages/hero/hero-detail/hero-detail.component.ts`) 
  - Define a variable `hero` that is the result of the async operation `hero$` using the pipe async. If hero is valid, display the `app-hero-item` component with the hero as input. Otherwise, display the `app-hero-item-not-found` component.
  - Implement the `ngOnChanges` lifecycle hook to update the `hero$` observable.
- **TODO 719** (`shared/services/hero.service.ts`) 
  - Update the `findAll` method to use the `httpClient` to find a hero to the `API_ENDPOINT`.


Enjoy your coding journey
