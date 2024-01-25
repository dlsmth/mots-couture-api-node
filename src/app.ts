// const express = require('express');
import express from 'express';
import bodyParser from 'body-parser';
import wordsRoutes from './routes/words';

const app = express();

app.listen(3000);

app.use(bodyParser.json());

app.use(wordsRoutes);