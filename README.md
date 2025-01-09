# Angular Renaissance Fundamentals Workshop 17+

In this step, we develop the following web:

![Router-params](/docs/06.02-router-params-solved.gif)

In the workshop, it is necessary to have a backend that powers our frontend application. For the purposes of this workshop, a backend developed in Node.js has been provided, located in the `api` directory. The API does not persist data in a database but stores it in RAM. Therefore, every time the backend restarts, its data will reset.

To run the API, you can execute it independently by following these steps:

1. `cd api`
2. `npm i`
3. `npm start:dev`

Alternatively, if you run the npm script `npm start`, the API will start concurrently with the Angular web application.

## Endpoints

The configured endpoints in the backend are as follows:

### Dependencies

#### `dependencies`
- **cors**: Middleware to enable CORS (Cross-Origin Resource Sharing) in Express applications.
- **express**: Web framework for Node.js, used to build web applications and APIs.
- **jsonwebtoken**: Library for creating and verifying JSON Web Tokens (JWT), used for authentication and authorization.
- **reflect-metadata**: Library that adds support for metadata reflection, primarily used with TypeScript and decorators.
- **tsyringe**: Dependency injection container for TypeScript, used to manage dependencies efficiently.

#### `devDependencies`
- **nodemon**: Tool to automatically restart the Node.js server when file changes are detected.
- **ts-node**: TypeScript executor for Node.js, allowing TypeScript files to be run directly.
- **typescript**: Programming language that extends JavaScript with static typing.

### Scripts

- **`start`**: Starts the server in production mode using `ts-node` to execute the `server.ts` file.
  ```bash
  npm start
  ```
- **`start:dev`**: Starts the server in development mode using `nodemon` to automatically restart the server when file changes are detected.
  ```bash
  npm run start:dev
  ```

The server will start at `http://localhost:9000`.

### Project Structure

```plaintext
/
├── controllers/    # Application controllers
├── middleware/     # Custom middlewares
├── services/       # Application services
├── app.ts          # Main application configuration
├── server.ts       # Server entry point
├── heroes-db.ts    # Database with heroes
├── heroes-db-lite.ts # Lite database with heroes
└── README.md       # This file
```

### Endpoints

#### Heroes

- `GET /heroes`: Retrieves all heroes.
- `GET /heroes?limit={L}&page={P}`: Retrieves a subset of heroes paginated, where `L` is the number of heroes to retrieve, and `P` is the page number.
- `GET /heroes/:id`: Retrieves a hero by ID.
- `POST /heroes`: Creates a new hero.
- `PATCH /heroes/:id`: Updates a hero by ID.
- `DELETE /heroes/:id`: Deletes a hero by ID.
- `PUT /heroes/:id`: Updates a hero by ID.

#### Users

- `POST /login`: Logs in a user.
- `POST /register`: Registers a new user.

## Exercises

To develop the workshop exercises, you should have Angular running in development mode. Use the following npm script:

```bash
cd api
npm run start:dev
```

Once running, you can develop and see changes in real-time.

Using Postman or any similar tool, perform the following tests:

- **TODO 700**: Retrieve all heroes in the database.  
  **Endpoint**: `GET /heroes`  
  **Example**:  
  ```http
  GET http://localhost:9000/heroes
  ```

- **TODO 701**: Retrieve a subset of heroes limited to 10 heroes on page 3.  
  **Endpoint**: `GET /heroes?limit=10&page=3`  
  **Example**:  
  ```http
  GET http://localhost:9000/heroes?limit=10&page=3
  ```

- **TODO 702**: Delete the heroes with `ID 1` and `ID 3`.  
  **Endpoint**: `DELETE /heroes/:id`  
  **Examples**:  
  ```http
  DELETE http://localhost:9000/heroes/1
  DELETE http://localhost:9000/heroes/3
  ```

- **TODO 703**: Update the hero with `ID 2`, changing its `name` and some `powerstats`.  
  **Endpoint**: `PATCH /heroes/:id`  
  **Example**:  
  ```http
  PATCH http://localhost:9000/heroes/2
  Content-Type: application/json

  {
    "name": "Updated Hero Name",
    "powerstats": {
      "strength": 85,
      "speed": 90
    }
  }
  ```

- **TODO 704**: Create a new hero, completing all its data.  
  **Endpoint**: `POST /heroes`  
  **Example**:  
  ```http
  POST http://localhost:9000/heroes
  Content-Type: application/json

  {
    "name": "New Hero",
    "powerstats": {
      "strength": 80,
      "speed": 75,
      "intelligence": 90
    },
    "alignment": "good"
  }
  ```

- **TODO 705**: Register in the system using a `username` and `password`.  
  **Endpoint**: `POST /register`  
  **Example**:  
  ```http
  POST http://localhost:9000/register
  Content-Type: application/json

  {
    "username": "user1",
    "password": "securepassword"
  }
  ```

- **TODO 706**: Authenticate the previously registered user and verify that you receive an `access_token`.  
  **Endpoint**: `POST /login`  
  **Example**:  
  ```http
  POST http://localhost:9000/login
  Content-Type: application/json

  {
    "username": "user1",
    "password": "securepassword"
  }

Enjoy your coding journey
