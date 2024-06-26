const express = require("express");
const app = express()
const port = 5000

const { MongoClient } = require('mongodb');

const cors = require('cors')
app.use(cors())

//Connecting the database
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://root:root@tasks.jrjhcnd.mongodb.net/?retryWrites=true&w=majority&appName=tasks')
    .then(() => {
        console.log("DB connected")
        app.listen(5000, () => {
            console.log("Server is listening on port" + port)
        })
    }).catch(err => console.log(err))

const userRouter = require("./routes/users")
app.use("/users", userRouter)

app.get("/",(req,res)=>{
  res.json("Working")
})
//Listening to the server


