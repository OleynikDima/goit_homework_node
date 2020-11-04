## 06-email

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
