const express = require('express')
const Book = require('../model/booksModel')
const router = express.Router()
const {multer, storage} = require('../middleware/multerConfig')
const upload = multer({storage : storage})
const fs = require('fs')

//books store in database

    router.post('/books', upload.single('coverImage') ,async(req, res) =>{
    const {title, description, category, coverImage, oldPrice, newPrice, date} = req.body
    const filename = req.file.filename
    if(!title || !description || !category || !oldPrice || !newPrice){
        return res.status(400).json({
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

//fetching books from database

router.get('/books', async(req, res) =>{
    const book = await Book.find()
    res.status(200).json({
        message: "fetched data successfully",
        data: book
    })
})

//fetching single book from database

router.get('/books/:id', async(req, res) =>{
    const id = req.params.id
    const book = await Book.findById(id)
    if(!book){
        return res.status(404).json({
            message: "no data found"
        })
    }
    res.status(200).json({
        message: "single book fetched successfully",
        data: book
    })
})

//deleting single book from database

router.delete('/books/:id', async(req, res) =>{
    const id = req.params.id
    const book = await Book.findById(id)
    const imageName = book.coverImage

    fs.unlink(`storage/${imageName}`, (err) =>{
        if(err){
            console.log(err)
        }else{
            console.log("file deleted successfully")
        }
    })

    await Book.findByIdAndDelete(id)
    res.status(200).json({
        message: "Delete book successfully"
    })
})
// update book data

router.patch('/books/:id',upload.single('coverImage'), async(req, res) =>{
    const id = req.params.id
    const {title, description, category, oldPrice, newPrice} = req.body
    let imageName;

    //update with image
    if(req.file){
        imageName = req.file.filename
        const book = await Book.findById(id)
        const oldImageName = book.coverImage

        fs.unlink(`storage/${oldImageName}`, (err) =>{
            if(err){
                console.log(err)
            }else{
                console.log("file deleted successfully")
            }
        })
    }


    //just data update not image
    await Book.findByIdAndUpdate(id,{
        title: title,
        description: description,
        category: category,
        oldPrice: oldPrice,
        newPrice: newPrice
    })
    res.status(200).json({
        message: "book updated succesfully"
    })
})
module.exports = router;