import app from './app.js';
import {connectDB} from './db/connectDB.js';
import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});


const start = async() => {
    try {
        await connectDB().then(() => {
            app.listen(3000, () => {
                console.log('Server running on port 3000');
            });
        })
    } catch (err) {
        console.log(err);
    }
}

start();