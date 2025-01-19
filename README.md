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

# **Workshop: Understanding `resource` and `rxResource` in Angular 19**

This workshop focuses on using `resource` and `rxResource` in Angular 19. These utilities simplify managing asynchronous data and state by providing built-in features like `loading`, `error`, and `data` management. By the end of this workshop, you will understand their differences, how to use them effectively, and how `rxResource` can serve as an alternative to RxJS for reactive state management.

---

## **What is `resource`?**

`resource` is a declarative API for managing asynchronous data in Angular. It tracks the lifecycle of a data fetch and provides convenient access to the state (`loading`, `error`, and `data`).

### **Key Features of `resource`**:
- Automatically tracks fetch lifecycle (loading, success, error).
- Lazy fetching triggered on access.
- Best for static or one-off data-fetching scenarios.

### **Example: Using `resource`**

```typescript
import { resource } from '@angular/core';

@Component({
  selector: 'app-users',
  template: `
    @if (users().loading) {
      <p>Loading...</p>
    } @else if (users().error) {
      <p>Error: {{ users().error }}</p>
    } @else {
      @for (let user of users().data) {
        <p>{{ user.name }}</p>
      }
    }
  `
})
export class UsersComponent {
  readonly #users = resource(() =>
    fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json())
  );

  users = this.#users;
}
```

### **How `resource` Works**:
The `resource` function automatically manages:
- **`data`**: The fetched result.
- **`loading`**: A boolean indicating if the fetch is in progress.
- **`error`**: An error object or message, if the fetch fails.

---

## **What is `rxResource`?**

`rxResource` builds on `resource` by fully integrating with RxJS, making it ideal for dynamic and reactive workflows.

### **Key Features of `rxResource`**:
- Reactive: Fetches are triggered automatically when dependencies change.
- Integrates seamlessly with RxJS observables and operators.
- Tracks state (`loading`, `error`, `data`) with support for advanced reactive scenarios.

### **Example: Using `rxResource`**

This example demonstrates a reactive search with `rxResource`.

```typescript
import { rxResource, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  template: `
    <input type="text" (input)="search($event)" placeholder="Search users" />

    @if (users().loading) {
      <p>Loading...</p>
    } @else if (users().error) {
      <p>Error: {{ users().error }}</p>
    } @else {
      @for (let user of users().data) {
        <p>{{ user.name }}</p>
      }
    }
  `
})
export class UsersComponent {
  readonly #httpClient = inject(HttpClient);
  readonly #query = signal('');
  users = rxResource(({ query }) =>
    this.#httpClient.get<User[]>('https://jsonplaceholder.typicode.com/users', {
      params: { q: query() }
    })
  );

  search(event: Event) {
    this.#query.set((event.target as HTMLInputElement).value);
  }
}
```

---

## **Comparison: `resource` vs `rxResource`**

| **Feature**        | **`resource`**                                  | **`rxResource`**                              |
|---------------------|------------------------------------------------|-----------------------------------------------|
| **Complexity**      | Simple, ideal for static use cases.             | Advanced, supports complex workflows.         |
| **Reactivity**      | Not reactive; triggers fetch manually.          | Reactive; fetches when dependencies change.   |
| **State Management**| Manages `loading`, `error`, and `data` internally. | Fully reactive with fine-grained control.    |
| **Dependencies**    | Simple, declarative fetch logic.                | Works with RxJS streams and signals.          |
| **Use Case**        | Static or one-off fetches.                      | Dynamic, reactive, multi-dependency fetches.  |

---

## **Using `rxResource` as an Alternative to RxJS**

While RxJS offers powerful tools for reactive programming, its verbosity and manual state management can be challenging. `rxResource` provides a declarative alternative by simplifying state tracking and reactivity.

### **RxJS Approach with Signals**

```typescript
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, switchMap, catchError, of } from 'rxjs';
import { signal } from '@angular/core';

@Component({
  selector: 'app-users',
  template: `
    <input type="text" (input)="search($event)" placeholder="Search users" />
    @if(loading()){
      <p>Loading...</p>
    }
    @if(error()){
      <p>Error: {{ error() }}</p>
    }
    <ul>
      @for(user of users(); track user.id){
        <li>{{ user.name }}</li>
      }
    </ul>
  `
})
export class UsersComponent {
  readonly #httpClient = inject(HttpClient);
  readonly #query = new BehaviorSubject<string>('');
  readonly #loading = signal(false);
  readonly #error = signal<string | null>(null);
  readonly users = signal<User[]>([]);

  constructor() {
    this.#query
      .pipe(
        switchMap((query) => {
          this.#loading.set(true);
          this.#error.set(null);
          return this.#httpClient.get<User[]>('https://jsonplaceholder.typicode.com/users', {
            params: { q: query }
          });
        }),
        catchError((err) => {
          this.#loading.set(false);
          this.#error.set('Failed to fetch users');
          return of([]);
        })
      )
      .subscribe((users) => {
        this.users.set(users);
        this.#loading.set(false);
      });
  }

  search(event: Event) {
    this.#query.next((event.target as HTMLInputElement).value);
  }

  loading = this.#loading;
  error = this.#error;
}
```

#### **`rxResource` Approach**

```typescript
import { rxResource, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  template: `
    <input type="text" (input)="search($event)" placeholder="Search users" />

    @if (users().loading) {
      <p>Loading...</p>
    } @else if (users().error) {
      <p>Error: {{ users().error }}</p>
    } @else {
      @for (let user of users().data) {
        <p>{{ user.name }}</p>
      }
    }
  `
})
export class UsersComponent {
  readonly #httpClient = inject(HttpClient);
  readonly #query = signal('');
  users = rxResource(({ query }) =>
    this.#httpClient.get<User[]>('https://jsonplaceholder.typicode.com/users', {
      params: { q: query() }
    })
  );

  search(event: Event) {
    this.#query.set((event.target as HTMLInputElement).value);
  }
}
```

#### **Why Use `rxResource`?**

| **Aspect**         | **RxJS**                                    | **`rxResource`**                              |
|---------------------|---------------------------------------------|-----------------------------------------------|
| **State Handling**  | Manually manage `loading` and `error`.      | Built-in `loading`, `error`, and `data` states. |
| **Complexity**      | Verbose and requires multiple signals.      | Declarative and concise.                      |
| **Reactivity**      | Requires `BehaviorSubject` or similar.      | Built-in support for reactivity with signals. |

With `rxResource`, you simplify your reactive workflows without sacrificing the power of RxJS.


---

Official documentation:

- [Http](https://angular.dev/guide/http)
- [Signal](https://angular.dev/guide/signals)
- [Resource/RxResource](https://angular.dev/guide/signals/resource)


## Exercises
To develop the workshop exercises, you should have Angular running in development mode. Use the following npm script:

`npm run serve`

Once running, you can develop and see changes in real-time.

Look for the following TODOs in the source code. If you need the solution, switch to the branch with the `-solved` suffix.

- **TODO 740** (`pages/home/home.component.ts`) Create the `heroesResource` property from rxResource using the loader `this.#heroService.load()`
- **TODO 741** (`pages/hero/hero-detail/hero-detail.component.ts`)
  - Create a `heroesResource` property from `rxResource` using the loader `this.#heroService.findOne()` and  the request function should use `this.id()`.
  - The `hero` should be a computed property that returns the value of the `heroesResource` or the `NullHero` from the `#heroService` 
  - Replace the effect and constructor using the `heroesResource`.
- **TODO 742** (`pages/hero/hero-new/hero-new.component.ts`) 
  - Create `heroSignal` using the default value `this.#heroService.defaultHero`. 
  - Create `heroResource` using `rxResource` where the `request` is the `heroSignal` and the `loader` is the `add` method from the `hero` service. The loader should only be called when the hero is different from the default hero. Also, create an equal function that compares the `id` of the heroes.
  - Create `isLoading`, `error`, and `isHeroResourceCompleted` signals from the `heroResource`. 
  - Create a `navigateEffect` that navigates to the home page when the hero is different from the default hero and the `heroResource` is resolved
  - Create an `errorEffect` that logs the error when the `heroResource` has an error
  - Replace the observable with the heroSignal.


Enjoy your coding journey
