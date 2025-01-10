const express = require('express')
const Book = require('../model/booksModel')
const router = express.Router()
const {multer, storage} = require('../middleware/multerConfig')
const upload = multer({storage : storage})

//books store in database

    router.post('/books', upload.single('coverImage') ,async(req, res) =>{
    const {title, description, category, coverImage, oldPrice, newPrice, date} = req.body
    const filename = req.file.filename
    if(!title || !description || !category || !oldPrice || !newPrice){
        return res.status(200).json({
            message: "please provide title, description, category, oldPrice and newPrice"
        })
    }
    await Book.create({
        title : title,
        description : description,
        category : category,
        coverImage: filename,
        oldPrice : oldPrice,
        newPrice : newPrice,
        date: date
    })    



    res.status(200).json({
        message: "Api worked successfully"
    })
    
})

module.exports = router;