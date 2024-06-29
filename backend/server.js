const express = require("express");
const session = require('express-session')
const MongoClient = require('mongodb').MongoClient
const store = new session.MemoryStore()
const app = express()
const port = 5000

const userRouter = require("./routes/users")

app.use(session({
    secret: 'some secret',
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
    store
}))

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


app.use("/users", userRouter)

app.post('/login', (req, res) => {
    res.json('asdf')
    console.log(req.sessionID);
    const { username, password } = req.body
    if (req.session.authenticated) {
        res.json(req.session)
    } else {
        if (password == '123') {
            req.session.authenticated = true
            req.session.user = {
                username, password
            }
            res.json(req.session)
        } else {
            console.log(req.body)
            res.status(403).json({ msg: 'Bad Credentials' })
        }
    }

    res.send(200)
})

app.get("/",(req,res)=>{
  console.log("Working")
})
//Listening to the server


