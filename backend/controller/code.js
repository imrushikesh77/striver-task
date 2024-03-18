import fs from 'fs';
import { pool } from '../db/connectDB.js';

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
                return res.json({
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
                return res.json({
                    message: "An error occurred while inserting into the database"
                });
            }
            if(codeFile)fs.unlinkSync(codeFile.path);
            return res.json({
                message: "Code submitted successfully"
            });
        }); 
    } catch (error) {
        console.log(error);
        return res.json({
            message: "Internal Server Error"
        });
    }
};


export const getSubmissions = (req, res) => {
    try {
        pool.query("SELECT id,username,language,stdin,sourceCode,timestamp FROM mydb", (err, result) => {
            if (err) {
                console.log(err);
                return res.json({
                    message: "An error occurred while fetching data"
                });
            }
            return res.json(result);
        });
    } catch (error) {
        console.log(error);
        return res.json({
            message: "Internal Server Error"
        });
    }
};
