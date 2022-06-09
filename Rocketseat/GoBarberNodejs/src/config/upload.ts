import multer from "multer";
import crypto from 'crypto';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

//used to get the photos uploaded
export default {
    directory: tmpFolder,

    storage : multer.diskStorage({
        //all the images uploaded 'll go to the this destination
        destination: tmpFolder,

        //name of the file(photo)
        filename: (request, file, callback) => {
            //create a file hash that'll be a crypto sting with 10 bytes (hexdecimal)
            const fileHash = crypto.randomBytes(10).toString('HEX');
            const fileName = `${fileHash}-${file.originalname}`;
            return callback(null, fileName)
        }
    })
};
