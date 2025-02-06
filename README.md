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

- `POST /user/login`: Login a user.
- `POST /user/register`: Registers a new user.

---

# Workshop: Implementing Route Guards in Angular

In this workshop, you will implement **Route Guards** in Angular to enhance the security and usability of your application. Specifically, you will:

- Use `CanActivate` to restrict access to authenticated users.
- Use `CanDeactivate` to warn users when they attempt to leave a page with unsaved changes.

These concepts build upon the authentication system developed in the previous steps.

## Introduction to Angular Route Guards
Angular provides **Route Guards** as a mechanism to control navigation within an application. Guards execute before navigating to or from a route, allowing developers to enforce authentication, authorization, or prevent unintended data loss.

### **Why Use Route Guards?**
- **Security**: Prevent unauthorized users from accessing certain pages.
- **Data Integrity**: Ensure users do not lose unsaved data when leaving a form.
- **User Experience**: Improve application flow by directing users appropriately.

### **Types of Route Guards in Angular**
1. **CanActivate**
   - Determines whether a user is allowed to access a specific route.
   - Often used for authentication and role-based access control.
   - Example use case: Prevent access to a dashboard unless the user is logged in.

2. **CanActivateChild**
   - Similar to `CanActivate` but applies to child routes.
   - Used to protect nested routes within a module/feature.
   - Example use case: Restrict access to a set of admin panel pages.

3. **CanDeactivate**
   - Determines if a user can leave a route.
   - Often used to prevent data loss from unsaved form changes.
   - Example use case: Warn a user before leaving an unfinished registration form.

4. **CanLoad**
   - Prevents lazy-loaded modules from being loaded unless a condition is met.
   - Used to restrict access before an entire module is fetched.
   - Example use case: Prevent loading an admin module if the user lacks permissions.

5. **Resolve**
   - Fetches data before navigating to a route.
   - Ensures the required data is available before rendering the component.
   - Example use case: Preload a user profile before displaying a profile page.

### **Comparison of Route Guards**
| Guard Type       | Purpose                                    | Common Use Cases |
|-----------------|--------------------------------|-----------------|
| CanActivate      | Prevents navigation if a condition is not met | Authentication & authorization |
| CanActivateChild | Restricts access to child routes | Role-based access for nested views |
| CanDeactivate    | Warns before leaving a page | Unsaved changes in forms |
| CanLoad         | Restricts lazy-loaded module access | Prevent unauthorized users from loading admin modules |
| Resolve         | Fetches data before navigation | Load user data before displaying a profile page |

### **Implementing Route Guards in Angular**
To use a route guard, you can define a **functional guard**, which is a more modern and lightweight approach compared to the traditional service-based guards.

#### **Example: Implementing CanActivate as a Functional Guard**
```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedIn()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
```

This functional guard checks if the user is authenticated and redirects to the login page if not.

#### **Example: Implementing CanDeactivate as a Functional Guard**
```typescript
import { CanDeactivateFn } from '@angular/router';
import { FormComponent } from './form.component';

export const pendingChangesGuard: CanDeactivateFn<FormComponent> = (component) => {
  return component.hasUnsavedChanges() ? confirm('You have unsaved changes. Do you really want to leave?') : true;
};
```

This `CanDeactivate` guard prompts users before leaving a page if they have unsaved changes.

### **Conclusion**
Angular Route Guards are essential for securing applications and enhancing user experience. By strategically using `CanActivate`, `CanDeactivate`, and other guards, developers can ensure users only access appropriate content while protecting data integrity. Functional guards provide a modern, concise approach to implementing route protection in Angular applications.

## Using viewChild and viewChildren Functions with Angular Signals

In Angular 17.2, `viewChild` and `viewChildren` were introduced as functions that return `Signal<T>`, replacing the traditional `@ViewChild` and `@ViewChildren` decorators. These functions allow a more reactive approach to accessing child components or elements in a template.

### viewChild Function

The `viewChild` function returns a `Signal<T>` that tracks a single child component or element.

Example: Using viewChild with Signals

```typescript
import { Component, viewChild, Signal, AfterViewInit } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  template: `
    <app-child></app-child>
    <button (click)="updateChild()">Update Child</button>
  `,
})
export class ParentComponent implements AfterViewInit {
  child = viewChild(ChildComponent);

  ngAfterViewInit() {
    console.log('Child component:', this.child());
  }

  updateChild() {
    if (this.child()) {
      this.child()?.updateMessage('New message from Parent');
    }
  }
}
```

### viewChildren Function

The `viewChildren` function returns a `Signal<QueryList<T>>` that tracks multiple child components or elements.

Example: Using viewChildren with Signals

```typescript
import { Component, viewChildren, Signal, QueryList, AfterViewInit } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  template: `
    <app-child *ngFor="let child of childrenList"></app-child>
    <button (click)="updateAllChildren()">Update All</button>
  `,
})
export class ParentComponent implements AfterViewInit {
  children = viewChildren(ChildComponent);

  ngAfterViewInit() {
    console.log('Child components:', this.children());
  }

  updateAllChildren() {
    this.children().forEach(child => child.updateMessage('Updated message!'));
  }
}
```

### Conclusion

Using `viewChild` and `viewChildren` as functions with Angular Signals provides a reactive and declarative way to access child components. This modern approach ensures better synchronization and reactivity, improving application maintainability and performance.


## Code Setup
1. **Generate TokenStorageService**

```typescript
import { Injectable, computed, signal } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  #isLogin = signal(false);
  readonly isLogin = computed(() => this.#isLogin());
  #token = localStorage.getItem("heroes-token") || "";

  constructor(){
    if(this.token){
      this.#isLogin.set(true);
    }
  }

  set token(token: string) {
    this.#token = token;
    localStorage.setItem("heroes-token", token);
    const logged = (token !== "");
    this.#isLogin.set(logged);
  }

  get token(): string {
    return this.#token;
  }

  logout(){
    this.token = "";
  }
}
```

2. **Generate Auth Guard**
    - Create the guard `authGuard` in `shared/guards/auth-guard.ts`.
```typescript
import { CanActivateFn, Router } from "@angular/router";

import { AUTH_PAGES } from "../../features/auth/auth.routes";
import { TokenStorageService } from "../services/token-storage.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const service = inject(TokenStorageService);

  return service.isLogin() ?? router.navigate([AUTH_PAGES.AUTH, AUTH_PAGES.AUTH]);
}
```

3. **Update Navigation Menu**
   - Update the `shared/components/header.component.{ts | html}` which change the navigation menu depending if the user is login in the system.

```typescript
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AUTH_PAGES } from '../../../features/auth/auth.routes';
import { HEROES_PAGES } from '../../../features/heroes/heroes.router';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  navigation = {
    home: [HEROES_PAGES.HERO, HEROES_PAGES.HOME],
    heroNew: [HEROES_PAGES.HERO, HEROES_PAGES.NEW],
    login: [AUTH_PAGES.AUTH, AUTH_PAGES.LOGIN],
    register: [AUTH_PAGES.AUTH, AUTH_PAGES.REGISTER],
  }
  readonly #tokenStorageService = inject(TokenStorageService);
  readonly #router = inject(Router);
  isLogin = this.#tokenStorageService.isLogin;

  logout(){
    const isSure = window.confirm('Are you sure?');
    if(isSure){
      this.#tokenStorageService.logout();
      this.#router.navigate([AUTH_PAGES.AUTH, AUTH_PAGES.LOGIN]);
    }
  }
}
```

```html
<nav class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="https://youtube.com/c/@DotTechES" class="flex items-center">
    <img src="assets/logo.png" class="h-8 mr-3" alt="DotTech Logo" />
    <span class="self-center text-2xl font-semibold whitespace-nowrap">DotTech</span>
  </a>

  <ul class="font-medium flex flex-row space-x-8">
    @if(isLogin()){
      <li>
        <a class="text-gray-900" aria-current="page" [routerLink]="navigation.home" routerLinkActive="text-blue-700">Home</a>
      </li>
      <li>
        <a class="text-gray-900" [routerLink]="navigation.heroNew" routerLinkActive="text-blue-700">New Hero</a>
      </li>
      <li>
        <a class="text-gray-900 cursor-pointer" (click)="logout()">Logout</a>
      </li>
    }@else{
      <li>
        <a class="text-gray-900" [routerLink]="navigation.login" routerLinkActive="text-blue-700">Login</a>
      </li>
      <li>
        <a class="text-gray-900" [routerLink]="navigation.register" routerLinkActive="text-blue-700">Register</a>
      </li>
    }
  </ul>
</nav>
```

---

## Exercises
To develop the workshop exercises, you should have Angular running in development mode. Use the following npm script:

`npm run serve`

Once running, you can develop and see changes in real-time.

Look for the following TODOs in the source code. If you need the solution, switch to the branch with the `-solved` suffix.

- **TODO 830** (`app.routes.ts`) Set up the `auth-guard` for the `heroes` feature, so that access is only allowed if the guard can be activated.
- **TODO 831** (`features/heroes/guards/hero-unsaved-changes.guard.ts`) Create a guard that returns a function of type `CanDeactivateFn<HeroUpdateComponent>`, which calls the `canDeactivate` method of the component where the guard is used.
- **TODO 832** (`features/heroes/components/hero-form.component.ts`) Create a signal `isPendingSave`, which will derive from the `heroForm` if it is in the `dirty` state.
- **TODO 833** (`features/heroes/pages/hero-update.component.ts`)
  - Retrieve the `hero-form.component` using the `viewChild` function and store it in an attribute called `heroFormComponent`.
  - Create the `canDeactivate` method, which, if the `heroFormComponent` is `isPendingSave`, asks the user if they want to leave the page using `confirm`. Otherwise, return `true`.
- **TODO 834** (`features/heroes/heroes.routes.ts`) Use the guard `features/heroes/guards/hero-unsaved-changes.guard.ts` for the route associated with updating heroes.

Enjoy your coding journey
