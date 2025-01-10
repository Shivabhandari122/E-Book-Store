const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './storage')
    },
    filename: (req, file, cb) =>{
        cb(null, "shiva-" + file.originalname)
    }
})

module.exports = {
    multer,
    storage
}