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

#### Understanding `Subject` and `BehaviorSubject` in Angular

In Angular, `Subject` and `BehaviorSubject` are two key types of Observables provided by RxJS. They are powerful tools for handling asynchronous data and managing state in your application. Let’s dive into what they are, their differences, and common use cases.


#### 1. **What is a Subject?**

A `Subject` is an RxJS type that acts both as an Observable and an Observer. This means you can emit values to it, and other parts of your application can subscribe to those values. 

Key Characteristics:
- **Multicasting:** A `Subject` can multicast values to multiple Observers simultaneously.
- **No Initial Value:** A `Subject` does not have an initial value, and subscribers will only receive values emitted after they subscribe.

**Basic Example:**

```typescript
import { Subject } from 'rxjs';

const subject = new Subject<number>();

// Subscriber 1
subject.subscribe(value => console.log('Subscriber 1:', value));

// Emit values
subject.next(1);
subject.next(2);

// Subscriber 2
subject.subscribe(value => console.log('Subscriber 2:', value));

// Emit another value
subject.next(3);

// Output:
// Subscriber 1: 1
// Subscriber 1: 2
// Subscriber 1: 3
// Subscriber 2: 3
```

---

#### 2. **What is a BehaviorSubject?**

A `BehaviorSubject` is a special type of `Subject` that requires an initial value and always emits the most recent value to new subscribers.

Key Characteristics:
- **Initial Value:** A `BehaviorSubject` must be initialized with a value.
- **Current State:** It always holds the latest emitted value, which is available to new subscribers.
- **State Management:** Commonly used to store and manage application state.

**Basic Example:**

```typescript
import { BehaviorSubject } from 'rxjs';

const behaviorSubject = new BehaviorSubject<number>(0); // Initial value is 0

// Subscriber 1
behaviorSubject.subscribe(value => console.log('Subscriber 1:', value));

// Emit values
behaviorSubject.next(1);
behaviorSubject.next(2);

// Subscriber 2
behaviorSubject.subscribe(value => console.log('Subscriber 2:', value));

// Emit another value
behaviorSubject.next(3);

// Output:
// Subscriber 1: 0
// Subscriber 1: 1
// Subscriber 1: 2
// Subscriber 1: 3
// Subscriber 2: 2
// Subscriber 2: 3
```

---

#### 3. **Key Differences Between Subject and BehaviorSubject**

| Feature                | Subject                                   | BehaviorSubject                          |
|------------------------|-------------------------------------------|------------------------------------------|
| **Initial Value**       | Not required                              | Required                                 |
| **New Subscribers**     | Receive only future emissions             | Receive the most recent value and future emissions |
| **Use Case**            | Event handling or emitting streams of data | Managing state or tracking the latest value |

---

#### 4. **When to Use Subject vs BehaviorSubject?**

| Use Case                            | Recommended Type     |
|-------------------------------------|----------------------|
| Event handling                      | **Subject**          |
| Storing and managing state          | **BehaviorSubject**  |
| Emitting values to multiple Observers | **Subject**          |
| Sharing the latest value with new subscribers | **BehaviorSubject**  |

---

#### 5. **Practical Example: Managing State with BehaviorSubject**

Here’s how you might use a `BehaviorSubject` to manage and share state across components:

**Service Example:**

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
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
}
```

**Component Example:**

```typescript
import { Component } from '@angular/core';
import { StateService } from './state.service';

@Component({
  selector: 'app-counter',
  template: `
    <div>Current Value: {{ counter$ | async }}</div>
    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>
  `
})
export class CounterComponent {
  counter$ = this.stateService.counter$;

  constructor(private stateService: StateService) {}

  increment() {
    this.stateService.increment();
  }

  decrement() {
    this.stateService.decrement();
  }
}
```

---

### Summary

- **Subjects** are great for event handling and multicasting values to multiple Observers.
- **BehaviorSubjects** are ideal for managing state, as they always hold the most recent value and share it with new subscribers.

---

Official documentation:

- [Http](https://angular.dev/guide/http)




## Exercises
To develop the workshop exercises, you should have Angular running in development mode. Use the following npm script:

`npm run serve`

Once running, you can develop and see changes in real-time.

Look for the following TODOs in the source code. If you need the solution, switch to the branch with the `-solved` suffix.

- **TODO 720** (`shared/services/hero.service.ts`)
  - Create an heroesSubject property privated and readonly which is a BehaviourSubject<Hero[]>
  - Create an heroes$ property public and readonly which is an Observable<Hero[]> 
- **TODO 721** (`shared/services/hero.service.ts`)
  - Update the `heroesSubject` property with the result of the API call.
- **TODO 721** (`pages/home/home.component.ts`)
  - Change `heroes$` to be the `heroes$` subject from the service.
  - Invoke to `load` method from the service and subscribe to it. Finally, use takeUntilDestroyed operator to avoid memory leaks.
- **TODO 722** (`shared/services/hero.service.ts`) Update the `heroesSubject` property with the new hero.
- **TODO 723** (`shared/services/hero.service.ts`) Update the `heroesSubject` property with the new hero.
- **TODO 724** (`shared/services/hero.service.ts`) Update the `heroesSubject` property removing the hero.
- **TODO 725** (`shared/services/hero.service.ts`) Update the `heroesSubject` property with the new hero.


Enjoy your coding journey
