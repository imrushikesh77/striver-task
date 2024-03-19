import express from 'express';
import cors from 'cors';
import {rateLimit} from 'express-rate-limit'

import router from './routes/code.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(
    {
        origin: 'https://striver-task.vercel.app/'
    }
));
app.use(rateLimit({
    windowMs: 5 * 1000, // 5 seconds
    max: 2, // limit each IP to 2 requests per windowMs
    message: "Too many submissions, please try again after 5 seconds",
  }))


app.use('/', router);


export default app;