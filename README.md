## 05-images

npm i generate-avatar multer imagemin

<br> used: <br />

- nodemon;
- express;
- mongoDb;
- mongoose;
- jsonwebtoken;
- bcrypt;
- multer;
- imagemin;

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

Status: 201 Created Content-Type: application/json ResponseBody: { "user": {
"email": "example@example.com", "subscription": "free" ,
"avatarUrl":"http://locahost:3000/images/<имя файла с расширением>"} }

### 2

### PATCH /users/avatars

Content-Type: multipart/form-data Authorization: "Bearer token" RequestBody:
загруженный файл
