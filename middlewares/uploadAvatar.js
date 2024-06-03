import multer from 'multer'
import crypto from 'crypto'
import path from 'node:path'

const storage = multer.diskStorage({ 
    destination(req,file,cd) {
        cd(null, path.resolve("temp"))
    },
    filename(req,file,cd) {
        const extname = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extname);
        const suffix = crypto.randomUUID();
        cd(null, `${basename}-${suffix}${extname}`);
    }
 });

 export default multer({ storage });