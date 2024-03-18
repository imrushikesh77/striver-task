import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
});


export const pool = mysql.createPool({
    host: '172.17.0.2',
    user: `root`,
    password: `pw`,
    database: `striver`,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 100,
})
// export const pool = mysql.createPool({
//     host: `${process.env.HOST}`,
//     user: `${process.env.USER}`,
//     password: `${process.env.PASSWORD}`,
//     database: `${process.env.DATABASE}`,
//     waitForConnections: process.env.WAIT_FOR_CONNECTIONS,
//     connectionLimit: process.env.CONNECTION_LIMIT,
//     queueLimit: process.env.QUEUE_LIMIT,
// })



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