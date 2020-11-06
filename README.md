## 06-email

<br> used: <br />

- uuidv4;
- SendGrid;

This project was Node.js

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the index.js <br />

### 'npm run dev'

Runs the nodemon index.js <br />

## Endpoint :

### 1

### POST /auth/register

Content-Type: application/json RequestBody: { "email": "example@example.com",
"password": "examplepassword" } , <br /> Content-Type: multipart/form-data
RequestBody: загруженный файл

### 2

### GET /auth/verify/:verificationToken

Status: 201 Created Content-Type: application/json ResponseBody: { "user": "User
Verify Ok:};
