## 04-auth

<br> used: <br />

- nodemon;
- express;
- mongoDb;
- mongoose;
- jsonwebtoken;
- bcrypt;

This project was Node.js

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the index.js <br />

### 'npm run dev'

Runs the nodemon index.js <br />

## Endpoint :

### 1

#### POST /auth/register

Content-Type: application/json RequestBody: { "email": "example@example.com",
"password": "examplepassword" }

Status: 201 Created Content-Type: application/json ResponseBody: { "user": {
"email": "example@example.com", "subscription": "free" } }

### 2

#### POST /auth/login

Content-Type: application/json RequestBody: { "email": "example@example.com",
"password": "examplepassword" }

Status: 200 OK Content-Type: application/json ResponseBody: { "token":
"exampletoken", "user": { "email": "example@example.com", "subscription": "free"
} }

### 3

#### POST /auth/logout

Authorization: "Bearer token"

Status: 204 No Content

### 4

#### GET /users/current

Authorization: "Bearer token"

Status: 200 OK Content-Type: application/json ResponseBody: { "email":
"example@example.com", "subscription": "free" }
