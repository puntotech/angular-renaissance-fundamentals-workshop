# Angular Renaissance Fundamentals Workshop

In this workshop, we develop an Angular Renaissance application (Angular 17+ until today) from scratch, introducing the fundamental concepts of Angular 17+ development, tailored for developers who have never built web applications with Angular before.

![Super Heroes Workshop!](/docs/demo.gif)

## Prerequisites

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/) and NPM – we recommend using [NVM (Linux/Mac)](https://github.com/creationix/nvm) or [NVM-Windows (Windows)](https://github.com/coreybutler/nvm-windows)
- Install Angular CLI via `npm i -g @angular/cli`

## Installation

### Install Angular

Refer to the [official Angular installation documentation](https://docs.angular.lat/guide/setup-local#instalar-la-cli-de-angular).

In summary, to install Angular CLI, execute the following command:

```bash
npm install -g @angular/cli
```

### Install the Angular Fundamentals Workshop

1. `git clone git@github.com:puntotech/angular-renaissance-fundamentals-workshop.git`
2. `cd angular-renaissance-fundamentals-workshop`
3. `npm i`
4. `npm start`

The `npm start` script invokes the `serve:all` command, which runs the `serve:api` and `serve:web` commands concurrently. Of course, you can invoke each command separately if necessary.

```json
"start": "npm run serve:all",
"serve:web": "ng serve --port 4200 --open",
"serve:api": "npm --prefix <path> run <command>",
"serve:all": "concurrently \"npm run serve:api\" \"npm run serve:web\"",
```

The web application will open in [http://localhost:4200](http://localhost:4200) in your browser.

The API will be available at [http://localhost:9001/](http://localhost:9001/) starting from the [06.01-http](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/61.01-http) branch.

## How to Complete the Workshop

The repository is organized into numbered branches (`01`, `02`, `03`, ...), which represent the steps to follow in the workshop. The first step is branch `01`, followed by `02`, and so on.

Each branch has a specific name defining the concept presented in that branch. The README files in these branches describe the Angular concept and include a challenge to solidify understanding.

Finally, branches containing the solution to the challenges have the `-solved` suffix.

For example, the first concept is found in the branch [01.01-single-component](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/01.01-single-component), and its solution is in [01.01-single-component-solved](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/01.01-single-component-solved).

## API

The workshop requires a backend to provide data to the frontend application. A Node.js backend is provided in the `api` directory. The API uses in-memory data storage, so data is reset each time the backend restarts.

To run the API independently, follow these steps:

1. `cd api`
2. `npm i`
3. `npm start:dev`

Alternatively, if you run the `npm start` script, the API will start concurrently with the Angular web application.

## Branches

The available branches are as follows:

| Branch Name                                                                                                                   | Concept                                      |
| ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| [main](https://github.com/puntotech/angular-renaissance-fundamentals-workshop)                                                            | Initial branch                               |
| [01.01-single-component](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/01.01-single-component)              | Component creation                           |
| [01.01-single-component-solved](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/01.01-single-component-solved)| Component creation solution                  |
| [02.01-communication-input](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/02.01-communication-input)                    | Component communication (input)     |
| [02.01-communication-input-solved](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/02.01-communication-input-solved)      |                                              |
| [02.02-communication-output](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/02.02-communication-output)                    | Component communication (output)     | 
| [02.02-communication-output-solved](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/02.02-communication-output-solved)      |                                              | 
| [02.03-communication-control-flow](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/02.03-communication-control-flow)      |        Component communication (control-flow)                                      |
| [02.03-communication-control-flow-solved](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/02.03-communication-control-flow-solved)      |                                              |
| [03.01-form-new](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/03.01-form-new)                              | Reactive forms                               |
| [03.01-form-new-solved](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/03.01-form-new-solved)                |                                              |
| [03.02-form-new-error](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/03.02-form-new-error)                  | Error handling in reactive forms             |
| [03.02-form-new-error-solved](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/03.02-form-new-error-solved)    |                                              |
| [03.03-form-new-control-flow](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/03.03-form-new-control-flow)                  | Reactive form optimization                   |
| [03.03-form-new-control-flow-solved](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/03.03-form-new-control-flow-solved)    |                                              |
| [04.01-services](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/04.01-services)                              | Service creation                             |
| [04.01-services-solved](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/04.01-services-solved)                |    

| [05.01-tailwind](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/05.01-tailwind)                              | Tailwind integration                             |
| [05.01-tailwind-solved](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/05.01-tailwind-solved)                |   
|
| [06.01-router](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/06.01-router)                                  | Introduction to the router                   |
| [06.01-router-solved](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/06.01-router-solved)                    |                                              |
| [06.02-router-params](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/06.02-router-params)                    | Router: Passing parameters                   |
| [06.02-router-params-solved](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/06.02-router-params-solved)      |                                              |
| [07.01-http](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/07.01-http)                                      | Backend communication                        |
| [07.01-http-solved](https://github.com/puntotech/angular-renaissance-fundamentals-workshop/tree/07.01-http-solved)                        |                                              |
| 08.01-features                                                                                                               | App architecture in features                 |
| 08.01-features-solved                                                                                                        |                                              |
| 08.02-login-register                                                                                                         | Login/Register pages                         |
| 08.02-login-register-solved                                                                                                  |                                              |
| 08.03-guards                                                                                                                 | Guard creation                               |
| 08.03-guards-solved                                                                                                          |                                              |
| 08.04-interceptors                                                                                                           | Interceptors (Token and Loader)              |
| 08.04-interceptors-solved                                                                                                    |                                              |
