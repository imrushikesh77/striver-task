import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./codeFiles");
    },
    filename: (req, file, cb) => {
        return cb(null, file.originalname);
    }
});

export const upload = multer({ storage });