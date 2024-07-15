import express, { Request, RequestHandler, Response } from 'express';
import morgan from 'morgan';
import { router } from './postsRouter/postsRouter';
import cors from "cors";

const app = express();
const port = 4000;
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', router);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
