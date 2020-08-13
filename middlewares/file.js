const multer = require('multer');
const moment = require('moment');
/**
 // console.log('multer', multer);
 * [Function: multer] {
    diskStorage: [Function],
    memoryStorage: [Function],
    MulterError: [Function: MulterError]
  }
 */


const storageConfigs = multer.diskStorage({
    destination(req, file, cb) {//A string or function that determines the destination 📁 path for uploaded files. | folder in which will store upload files 
        console.log("FOLDER NAME FOR UPLOAD FILES ");
        cb(null, "uploads");
    },

    filename(req, file, cb) {//A function that determines the name of the uploaded file.📰
        /**
         * file acceptFiles {
            fieldname: 'avatar',
            originalname: 'A-for-cv.png',
            encoding: '7bit',
            mimetype: 'image/png'
            }
         */

        const uniqueName = moment().format('YYYY-MM-DD HH-mm-ss_SSS');
        // console.log("unque name is" - `${file.fieldname}-${uniqueName}-${file.originalname}`);
        cb(null, `${file.fieldname}-${uniqueName}-${file.originalname}`);//originalname is require
    }
});//Returns a StorageEngine implementation configured to store files on the local file system.


const allowTypes = ["image/jpg", "image/jpeg", "image/png"];//mime-types

const acceptFiles = (req, file, cb) => {//Set this to a function to control which files should be uploaded and which should be skipped.
    if (allowTypes.includes(file.mimetype)) {
        console.log('FILE is ACCEPTED');
        cb(null, true);
    } else {
        console.log('FILE not ACCEPTED');
        cb(null, false);
    }

}

module.exports = multer({
    storage: storageConfigs,
    fileFilter: acceptFiles
});