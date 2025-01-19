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

# Angular Workshop: Transitioning to Feature-Based Architecture with Standalone Components

This workshop is designed to help you transition from the legacy `@NgModule` approach to a modern feature-based architecture using Angular's standalone components. By the end, you'll understand how to structure your application for scalability, maintainability, and performance.

---

## **1. Background: The Legacy `@NgModule` Approach**

In earlier versions of Angular, `@NgModule` was the cornerstone of organizing and bootstrapping Angular applications. Each module acted as a container for related components, directives, pipes, and services, which were explicitly declared and imported/exported as needed.

### **Example of `@NgModule`-Based Organization**
```typescript
@NgModule({
  declarations: [DashboardComponent, UsersComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [DashboardComponent, UsersComponent],
  providers: [UsersService],
})
export class DashboardModule {}
```

While this approach was effective, it introduced boilerplate and required extensive configuration for even small applications. Dependencies like `RouterModule` and shared components needed to be repeatedly imported and exported.

### **Challenges with `@NgModule`**
- **Complexity**: Increased boilerplate for defining imports and exports.
- **Coupling**: Modules were tightly coupled, making it harder to achieve true modularity.
- **Performance**: Additional layers of abstraction could hinder performance optimizations.

---

## **2. Feature-Based Architecture with Standalone Components**

Angular's modern approach eliminates the need for `@NgModules` by introducing standalone components. These components are self-contained, importing only the dependencies they require, and simplifying application organization.

### **Feature Organization**
In a feature-based architecture, the application is divided into functional areas (features). Each feature contains its components, routes, services, and styles organized within its directory. For example:

```
/src/app
  /features
    /dashboard
      dashboard.component.ts
      dashboard.routes.ts
      dashboard.service.ts
      dashboard.styles.css
    /users
      users.component.ts
      users.routes.ts
      users.service.ts
      user-detail.component.ts
  /shared
    components/
    directives/
    pipes/
    services/
```

### **Advantages of Feature-Based Architecture**
- **Simplified Imports**: Each component explicitly declares its dependencies.
- **Reduced Boilerplate**: No need for `@NgModule` configuration.
- **Lazy Loading**: Easier to load features on demand.
- **Improved Maintainability**: Clear separation of concerns by feature.

---

## **3. Example: Defining a Feature with Standalone Components**

Here’s how to set up a `Users` feature with standalone components:

### **Users Component**
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<h1>Users</h1>`
})
export class UsersComponent {}
```

### **Users Routes**
```typescript
import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';

export const usersRoutes: Routes = [
  { path: '', component: UsersComponent }
];
```

### **Lazy Loading in Root Router**
```typescript
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: 'users', loadChildren: () => import('./features/users/users.routes').then(m => m.usersRoutes) },
  { path: '**', redirectTo: 'users' }
];
```

---

## **4. Comparing Legacy and Modern Approaches**

| **Aspect**             | **Legacy (`@NgModule`)**                  | **Modern (Standalone Components)** |
|-------------------------|------------------------------------------|-------------------------------------|
| **Structure**          | Organized by modules.                   | Organized by features.             |
| **Dependency Management** | Modules manage shared dependencies.    | Components declare their own imports. |
| **Boilerplate**        | Requires imports, exports, and declarations. | Simplified, self-contained setup.  |
| **Lazy Loading**       | Achieved with `loadChildren` in modules. | Achieved with `loadChildren` in routes directly. |
| **Performance**        | Slight overhead from module management. | Streamlined, optimized for performance. |

---

## **5. Workshop Goals**
- Transition from `@NgModule` to feature-based organization.
- Learn how to set up standalone components and routes.
- Understand the benefits of feature-based architecture for large-scale applications.
- Implement lazy loading and shared resources effectively.

---

By the end of this workshop, you’ll be equipped to build modular, scalable, and maintainable Angular applications using modern best practices.



---

Official documentation:

- [Http](https://angular.dev/guide/http)
- [Signal](https://angular.dev/guide/signals)
- [Resource/RxResource](https://angular.dev/guide/signals/resource)


# Preparacion

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  // Use dynamic imports to load modules lazily
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth'
      },
      {
        path: 'hero',
        loadChildren: () => import('./features/heroes/heroes.routes').then(r => r.HEROES_ROUTES),
      },
      {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES),
      },
    ]
  },

  { path: "**", redirectTo: "auth" },
];
```

## Exercises
To develop the workshop exercises, you should have Angular running in development mode. Use the following npm script:

`npm run serve`

Once running, you can develop and see changes in real-time.

Look for the following TODOs in the source code. If you need the solution, switch to the branch with the `-solved` suffix.


- **TODO 800**  The project structure should be as follows:

features/
├── auth/
│   ├── components/
│   ├── pages/
│   └── auth.routes.ts
├── heroes/
│   ├── components/
│   ├── guards/
│   ├── interfaces/
│   ├── pages/
│   ├── services/
│   ├── validators/
│   └── hero.routes.ts
shared/
└── components/
    ├── header/
    └── footer/

 
Enjoy your coding journey
