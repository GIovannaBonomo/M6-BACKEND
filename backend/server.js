import 'dotenv/config'; // importa il contenuto del file .env
import cors from 'cors'; // permette di gestire il CORS (chiamate da frontend su domini diversi da quello del backend)
import express, { Router } from 'express';

import { connectDB } from './db.js';
import authorsRouter from './route/authors.js';
import postRouter from './route/post.js';
import commentsRouter from './route/comments.js';
import authRouter from './route/auth.js';
import { authVerify } from './middlewares/authVerify.js';
import passport from 'passport';
import strategyGoogle from './config/passportConfig.js';



const port = process.env.PORT || 5000;

const server = express(); // creaiamo il server base

server.use(cors()); // accetta richieste da qualsiasi dominio
server.use(express.json()); // per gestire i body di tipo json

passport.use(strategyGoogle)

//server.get('/api', (request, response) => {
//    // tante cose di logica
//    response.send('<h1>Questa è la nostra API</h1>');
//});

server.use('/auth', authRouter);

server.use('/authors', authorsRouter);

server.use('/post', postRouter); 

server.use('/posts', authVerify, commentsRouter);



connectDB(); // connessione al database

// mettiamo il server in ascolto di richieste alla porta stabilita
server.listen(port, () => console.log(`Server avviato sulla porta ${port}`));

