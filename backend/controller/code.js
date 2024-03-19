import fs from 'fs';
import { pool } from '../db/connectDB.js';
import client from '../redis/redis.js';

export const submitCode = async(req, res) => {
    try {
        const {
            username,
            language,
            stdin,
            sourceCode
        } = req.body;
        const codeFile = req.file;
        if (!username || !language || (!sourceCode && !codeFile) || !stdin) {
            return res.json({
                message: "Please fill in all fields"
            });
        }
        let data;
        if (codeFile) {
            try {
                data = fs.readFileSync(codeFile.path, 'utf-8');
            } catch (err) {
                console.log(err);
                fs.unlinkSync(codeFile.path);
                return res.status(500).json({
                    message: "An error occurred while reading the file"
                });
            }
        }
    
        const codeToInsert = data || sourceCode;
    
        const sql = "INSERT INTO mydb (username, language, stdin, sourceCode) VALUES (?, ?, ?, ?)";
        pool.query(sql, [username, language, stdin, codeToInsert], (err, result) => {
            if (err) {
                console.log(err);
                if(codeFile)fs.unlinkSync(codeFile.path);
                return res.status(500).json({
                    message: "An error occurred while inserting into the database"
                });
            }
            if(codeFile)fs.unlinkSync(codeFile.path);
            // Clearing the redis cache
            if(client.connected){
                client.del('submissions');
            }
            return res.status(200).json({
                message: "Code submitted successfully"
            });
        }); 
    } catch (error) {
        console.log(error);
        if(req.file)fs.unlinkSync(req.file.path);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};


export const getSubmissions = (req, res) => {
    try {
        // Checking if the redis client is connected.
        if(client.connected){
            // If connected, check if the 'submissions' key exists in the cache.
            if(client.get('submissions')){
                return res.status(200).json(JSON.parse(client.get('submissions')));
            }
        }
        pool.query("SELECT id,username,language,stdin,sourceCode,timestamp FROM mydb", (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "An error occurred while fetching data"
                });
            }
            // If the redis client is connected, set the 'submissions' key in the cache.
            if(client.connected){
                client.set('submissions', JSON.stringify(result));
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
