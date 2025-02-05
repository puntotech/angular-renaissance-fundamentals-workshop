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

# Creating Login and Register Pages in Angular

## Objective
In this workshop, you will create the `Login` and `Register` pages for an Angular application. These pages will use dedicated components and an authentication service to interact with an API. This task is part of the broader project available in this repository

## Code Setup
1. **Generate AuthLogin Interface**
   - Create the interface `AuthLogin` in the `auth` feature (`features/auth/interfaces/auth-login.interfaces.ts`).
```typescript
export interface AuthLogin {
  username: string;
  password: string;
}
```
2. **Generate Auth Service**
    - Create the service `AuthService` in the `auth`feature (`features/auth/services/auth.service.ts`).
```typescript
import { Injectable, inject } from "@angular/core";

import { AuthLogin } from "../interfaces/auth-login.interface";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_ENDPOINT = "http://localhost:9000/user";
  private readonly httpClient = inject(HttpClient);

  login(user: AuthLogin): Observable<AuthLogin> {
    return this.httpClient.post<AuthLogin>(`${this.API_ENDPOINT}/login`, user);
  }

  register(user: AuthLogin): Observable<AuthLogin> {
    return this.httpClient.post<AuthLogin>(`${this.API_ENDPOINT}/register`, user);
  }
}
```

3. **Generate Components**
   - Create two new components: `login-form` and `register-form` (both are similar, but this is a workshop for practice).
   - `ng g c --skip-tests --inline-style features/auth/components/login-form`
   - `ng g c --skip-tests --inline-style features/auth/components/register-form`

---

Official documentation:

- [Http](https://angular.dev/guide/http)
- [Signal](https://angular.dev/guide/signals)
- [Resource/RxResource](https://angular.dev/guide/signals/resource)


---

## Exercises
To develop the workshop exercises, you should have Angular running in development mode. Use the following npm script:

`npm run serve`

Once running, you can develop and see changes in real-time.

Look for the following TODOs in the source code. If you need the solution, switch to the branch with the `-solved` suffix.

- **TODO 820** Create the Login and Register components using `FormBuilder` in a similar way you made the `hero-form` form.
- **TODO 821** (`features/auth/pages/login/login.component.ts`) Implement Reactive Authentication Flow
  - Use `rxResource` to manage login requests.
  - Prevent unnecessary API calls when login credentials are empty (Implement a function to check if login credentials are empty).
- **TODO 822** (`features/auth/pages/login/login.component.ts`) Manage Authentication Errors**  
  - Implement an effect to update `errorMessage` when login fails.
  - Extract the error message from the HttpErrorResponse object.
- **TODO 823** (`features/auth/pages/login/login.component.ts`): Implement Navigation on Success
  - Create an effect to detect a successful login.
  - Redirect the user to the `HEROES_PAGES.HERO` page after a successful login.
- **TODO 824** (`features/auth/pages/register/register.component.ts`)
  - Build the same but applied to the `register` page.

Enjoy your coding journey
