const express = require("express")
require("dotenv").config();
const connectToDB = require("./src/db/db")
const bookModel = require("./src/models/book.model")

const app = express()

app.use(express.json())

app.post("/books",async(req,res)=>{
    const{title,author} = req.body
    console.log(title,author);

    await bookModel.create({
        title,author
    })

    res.json({
        message: "Note Create Successfully"
    })
})

app.get("/books", async(req,res)=>{
    const books = await bookModel.find()
    res.json({
        message: "Notes Fetch Successfully",
        books
    })
})

app.delete("/books/:id", async(req,res)=>{
    const bookId = req.params.id
    await bookModel.findOneAndDelete({
        _id : bookId
    })
    res.json({
        message: "Note Deleted Successfully"
    })
})

app.patch("/books/:id", async(req,res)=>{
    const bookId = req.params.id
    const {title, author} = req.body
     await bookModel.findOneAndUpdate({
        _id : bookId
     },{
        title: title,
        author: author
     })
     res.json({
        message: "Note Updated Successfully"
     })
})

connectToDB();

app.listen(3000,(req,res)=>{
    console.log("Server is running on port 3000");
})