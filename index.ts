import express, { Express, Request, Response , Application } from 'express';
import bodyParser from 'body-parser';
import todosRoutes from './src/routes/todos';
import dotenv from 'dotenv';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

// const express = require('express');
// import express from 'express';
// import bodyParser from 'body-parser';
// import todosRoutes from './routes/todos';

// const app = express();

// app.use(bodyParser.json());

// app.listen(3000);

// app.use()