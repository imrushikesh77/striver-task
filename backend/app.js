import express from 'express';
import cors from 'cors';

import router from './routes/code.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(
    {
        origin: '*',
    }
));


app.use('/', router);


export default app;