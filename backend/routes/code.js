import express from "express";
import { upload } from "../middlewares/multer.js";
import { 
    submitCode,
    getSubmissions
 } from "../controller/code.js";

const router = express.Router();

router.post('/submit',upload.single('codeFile'), submitCode);
router.get('/submissions', getSubmissions);


export default router;