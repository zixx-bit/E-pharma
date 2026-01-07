import express from 'express';
import cors from 'cors';
import { errorMiddleware } from '../../../packages/error-handler/error-middleware.js';
// import { errorMiddleware } from "../../packages/error-handler/error-middleware.ts"
import cookieParser from 'cookie-parser';
import router from './routes/auth.router.js';


const host = process.env.HOST ?? 'localhost';
// const port = process.env.PORT ? Number(process.env.PORT) : 6001;

const app = express();

app.use (
  cors({
    origin: ["http://localhost:3000"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

app.get('/', (req, res) => {
    res.send({ 'message': ' API Auth Service'});
});

app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api", router)
app.use(errorMiddleware);

const port = process.env.PORT || 6001;
const server = app.listen( Number(port), host, () => {
    console.log(`Auth service is running at http:/localhost:${port}/api`);
});

server.on('error', (err) =>{
    console.log("Server error: ", err);
});
// app.listen(port, host, () => {
//     console.log(`[ ready ] http://${host}:${port}`);
// });
