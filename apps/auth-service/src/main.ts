import express from 'express';
import cors from 'cors';
import { errorMiddleware } from '../../../packages/error-handler/error-middleware';
// import { errorMiddleware } from "../../packages/error-handler/error-middleware.ts"
import cookieParser from 'cookie-parser';
import router from './routes/auth.router.js';
import swaggerUi from 'swagger-ui-express';



const swaggerDocument = require("./swagger-output.json");
const host = process.env.HOST ?? 'localhost';
// const port = process.env.PORT ? Number(process.env.PORT) : 6001;

const app = express();
app.use(express.json());
app.use(cookieParser());

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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/docs-json", (req, res) =>{
  res.json(swaggerDocument);
})



//Routes
app.use("/api", router)
app.use(errorMiddleware);

const port = process.env.PORT || 6001;
const server = app.listen( Number(port), host, () => {
    console.log(`Auth service is running at http:/localhost:${port}/api`);
    console.log(`Swagger Docs available at http:/localhost:${port}/docs`);
});

server.on('error', (err) =>{
    console.log("Server error: ", err);
});
// app.listen(port, host, () => {
//     console.log(`[ ready ] http://${host}:${port}`);
// });