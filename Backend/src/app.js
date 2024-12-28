import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
    })
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ limit: '16kb', extended: true }));
app.use(cookieParser());

//TODO: import routes
import userRouter from './routes/user.routes.js';
import repoRouter from './routes/repo.routes.js';

app.use('/api/v1', userRouter);
app.use('/api/v1', repoRouter);

export { app };
