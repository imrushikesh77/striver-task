import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
});

export const pool = mysql.createPool({
    host: `${process.env.HOST}`,
    user: `sql6692532`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DATABASE}`,
    waitForConnections: process.env.WAIT_FOR_CONNECTIONS,
    connectionLimit: process.env.CONNECTION_LIMIT,
})

// console.log(pool);



export const connectDB = async() => {
    try {
        const conn = await pool.getConnection((err, conn) => {
            if (err) {
                console.log(err)
            }
            else{
                console.log('Connected to database')
                conn.release();
            }
        });
    } catch (error) {
        console.log(error);
    }
}