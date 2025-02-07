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

```markdown
# Workshop: Implementing HTTP Interceptors in Angular (Functional Interceptors)

In this workshop, you'll learn how to implement **HTTP Interceptors** using the new functional approach in Angular 19. Instead of registering interceptors through NgModules, you will configure them in a dedicated configuration file (e.g., `config.ts`) using the new provider function `withInterceptors`.

## Introduction to Angular HTTP Interceptors

HTTP Interceptors allow you to intercept, modify, or react to HTTP requests and responses globally. They run before a request leaves your application and after a response is received. This centralized handling is ideal for tasks such as:

- **Authentication:** Automatically attach authorization tokens or custom headers to outgoing requests.
- **Error Handling:** Catch HTTP errors and manage them uniformly.
- **Logging:** Log request and response details for debugging and monitoring.
- **Response Transformation:** Modify or format responses before they reach your components.

## Why Use HTTP Interceptors?

- **Centralized Request/Response Handling:** Write the logic once and have it applied across all HTTP communications.
- **Improved Security:** Ensure every outgoing request carries necessary authentication details.
- **Global Error Management:** Handle errors in one place, reducing repetitive error-checking in every service.
- **Code Maintainability:** Keep your HTTP-related logic decoupled from your business logic.
- **Enhanced User Experience:** Automatically manage retries, caching, or display global notifications for network issues.

## How Do Functional HTTP Interceptors Work in Angular 19?

With Angular 19, you can now write interceptors as pure functions instead of class-based services. A functional interceptor is a function that:
1. Receives an `HttpRequest` and an `HttpHandler`.
2. Returns an `Observable<HttpEvent<any>>` by calling `next.handle(request)` (potentially after modifying the request).
3. Uses RxJS operators (like `tap` and `catchError`) to process the response.

This approach minimizes boilerplate and makes your interceptor logic more concise and testable.

## Example Functional Interceptors

### 1. Logging Interceptor

Logs outgoing requests and incoming responses.

```typescript
// logging.interceptor.ts
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandler
): Observable<HttpEvent<any>> => {
  console.log('Outgoing Request:', req);
  return next.handle(req).pipe(
    tap(event => {
      console.log('Incoming Response:', event);
    })
  );
};
```

### 2. Error Handling Interceptor

Catches and logs HTTP errors globally.

```typescript
// error.interceptor.ts
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandler
): Observable<HttpEvent<any>> => {
  return next.handle(req).pipe(
    catchError(error => {
      console.error('HTTP Error:', error);
      // Additional error handling logic can be placed here (e.g., redirecting or showing notifications)
      return throwError(() => error);
    })
  );
};
```

### 3. Authentication Interceptor (with Best Practices)

**Note:** Although simple examples often retrieve the token directly from `localStorage` inside the interceptor, it is best practice to delegate token retrieval to a dedicated service (e.g., `TokenService` or `AuthService`). This improves maintainability, testability, and allows you to implement token refresh logic independently.

Below is an improved example where token retrieval is abstracted into a service.

#### **Token Service Example**

```typescript
// token.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  getToken(): string | null {
    // In a real application, you might retrieve the token from localStorage,
    // a cookie, or via an asynchronous call to refresh it.
    return localStorage.getItem('auth_token');
  }
}
```

#### **Auth Interceptor Using Token Service**

```typescript
// auth.interceptor.ts
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { TokenService } from './token.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandler
): Observable<HttpEvent<any>> => {
  // Retrieve token using the dedicated TokenService
  const tokenService = inject(TokenService);
  const authToken = tokenService.getToken();
  
  if (authToken) {
    // Clone the request and add the Authorization header
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` }
    });
    return next.handle(authReq);
  }
  return next.handle(req);
};
```

#### **Explanation**

By extracting token retrieval into `TokenService`, you:
- **Centralize token management**: Any changes (like token refresh or storage strategy) are handled in one place.
- **Improve testability**: You can easily mock `TokenService` in unit tests.
- **Reduce side effects in interceptors**: The interceptor remains a pure function with minimal responsibility.

## Configuring Interceptors in Angular 19

In Angular 19, you can configure your functional interceptors in a central configuration file (e.g., `config.ts`) using the new provider function `withInterceptors`. Then, include these providers in your bootstrap process.

### Example: config.ts

```typescript
// config.ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './interceptors/logging.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import { authInterceptor } from './interceptors/auth.interceptor';

// Register the functional interceptors using the new provider method
export const httpClientProviders = [
  provideHttpClient(
    withInterceptors([
      authInterceptor,    // Authentication should run first to attach tokens
      loggingInterceptor, // Logging interceptor logs the modified request
      errorInterceptor    // Error handling interceptor catches errors from previous modifications
    ])
  )
];
```

### Bootstrapping the Application with Interceptors

In your main application file (`main.ts`), import and use the `httpClientProviders` so that Angular applies these interceptors globally:

```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { httpClientProviders } from './config';

bootstrapApplication(AppComponent, {
  providers: [
    ...httpClientProviders,
    // other global providers
  ]
}).catch(err => console.error(err));
```

## Advanced Topics and Best Practices

### Chaining and Order of Interceptors

The order in which interceptors are registered is significant:
- **Authentication Interceptor**: Should run first to ensure tokens are attached.
- **Logging Interceptor**: Follows to log the modified request.
- **Error Handling Interceptor**: Typically placed last to catch any errors from earlier interceptors.

### Testing Interceptors

Functional interceptors, being pure functions, are easier to test using standard RxJS testing techniques. Write unit tests to verify that:
- Requests are correctly modified (e.g., headers are added).
- Errors are caught and handled appropriately.
- Logging occurs as expected (you may spy on `console.log`).

### Avoiding Side Effects

Keep your interceptor functions pure:
- Delegate side-effect operations (like token retrieval or refresh) to dedicated services.
- Ensure that any asynchronous operations are handled outside the interceptor function.

## Conclusion

Angular HTTP Interceptors—now implemented as functional interceptors—offer a powerful, concise, and testable way to handle HTTP requests and responses globally. By externalizing token retrieval into a dedicated service, you achieve better separation of concerns and maintainability. Configuring your interceptors via a central file (`config.ts`) using `withInterceptors` in Angular 19 streamlines your HTTP communication logic, enhances security, and improves overall application performance.

Happy coding!

---

## Exercises
To develop the workshop exercises, you should have Angular running in development mode. Use the following npm script:

`npm run serve`

Once running, you can develop and see changes in real-time.

Look for the following TODOs in the source code. If you need the solution, switch to the branch with the `-solved` suffix.

- **TODO 840** (`shared/interceptors.ts`) Create the `TokenInterceptor` at `shared/interceptors/auth.interceptor.ts`.

```typescript
import { HttpHandlerFn, HttpRequest } from "@angular/common/http";

import { TokenStorageService } from "../services/token-storage.service";
import { inject } from "@angular/core";

export function tokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn){
  const tokenStorageService = inject(TokenStorageService);

  if(tokenStorageService.token){
    console.log('TokenInterceptor token:', tokenStorageService.token);

    req = req.clone({
      headers: req.headers.set("Autorization", `Bearer ${tokenStorageService.token}`),
    });
  }
  return next(req);
}
```

- **TODO 841** (`app.config.ts`) Configure the `TokenInterceptor`.
- **TODO 842** (`lib/dottech-loader/dottech-loader.service.ts`) Create the Loader Service:

```typescript
import { Injectable, computed, signal } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DottechLoaderService {
  #isLoading = signal<boolean>(false);
  isLoading = computed(() => this.#isLoading());

  show() {
    this.#isLoading.set(true);
  }

  hide() {
    this.#isLoading.set(false);
  }
}
``` 
- **TODO 843** (`lib/dottech-loader/dottech-loader.interceptor.ts`) Create an interceptor that works with `DottechLoaderService`.
```typescript
import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Subject, debounceTime, finalize, switchMap, tap } from "rxjs";

import { DottechLoaderService } from "../services/loader.service";
import { inject } from "@angular/core";

export function dottechLoaderInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const loaderService = inject(DottechLoaderService);
/*
   OPTION 1: Without debounce
*/
  loaderService.show();
  return next(req).pipe(finalize(() => loaderService.hide()));

  /*
    OPTION 2: With debounce
  */
  /* const loaderSubject = new Subject<boolean>(); // Subject to control the loader

  // 1. Active the loader but with debounce
  loaderSubject.next(true);

  const request$ = next(req).pipe(
    switchMap(() => next(req)), // Run Http request
    debounceTime(300), // Wait 300ms before activating the loader
    tap(() => loaderService.show()), // Active the loader if the request takes more than 300ms
    finalize(() => {
      loaderService.hide(); // hide the loader when the request is finished
      loaderSubject.complete(); // Clean the subject
    })
  );
  return request$; */
}
```
- **TODO 844** (`lib/dottech-loader/dottech-loader.component`) Create a component to show the loader.
```typescript
import { Component, inject } from '@angular/core';

import { DottechLoaderService } from './dottech-loader.service';

@Component({
  selector: 'dottech-loader',
  template: `
@if(isLoading()){
<div class="grid h-screen fixed right-8 z-50">
  <div class="place-self-end loader"></div>
</div>
}`,
  styles: `
.loader{
  @apply border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600
}`
})
export class DottechLoaderComponent {
  isLoading = inject(DottechLoaderService).isLoading;
}
```

- **TODO 841** (`app.config.ts`) Configure the `DottechLoaderInterceptor`.
- **TODO 845** (`app.component.ts`) Update the component to use `DottechLoader`.

```typescript
import { Component } from '@angular/core';
import { DottechLoaderComponent } from './lib/dottech-loader/dottech-loader.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, DottechLoaderComponent],
  template: `
<dottech-loader/>
<div class="grid min-h-screen grid-rows-[auto_1fr_auto] justify-between mx-auto pt-4">
  <app-header class="col-span-3"/>
    <router-outlet />
  <app-footer class="col-span-3" />
</div>`
})
export class AppComponent {
  title = 'workshop-fundamentals';
}
```

Enjoy your coding journey
