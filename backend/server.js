const express = require('express')
const cors = require('cors')
const { MongoClient, ObjectId } = require('mongodb')

const app = express()
const port = 5000
var client, db, collection

app.use(express.json())
app.use(cors())

async function connect() {
    try {
        client = await MongoClient.connect('mongodb+srv://root:root@tasks.jrjhcnd.mongodb.net/?retryWrites=true&w=majority&appName=tasks')
        console.log("Connected")
        db = client.db("users")
        collection = db.collection("users")
    } catch (e) {
        console.log(e)
    }
}

connect()


app.post('/adduser', async (req, res) => {
    const data = req.body
    try {
        const result = await collection.insertOne(data)
        res.send(result.insertedId.toString())
        console.log("Inserted")
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Error' })
    }
})

app.get('/niches/:id', async (req, res) => {
    const id = req.params.id
    try {
        const query = { _id: new ObjectId(id) }
        const cursor = collection.find(query)
        const results = await cursor.toArray()

        res.send(results[0].niches)
    } catch (e) {
        res.send(e)
    }
})

app.put('/niches/:id', async (req, res) => {
    const id = req.params.id
    const data = req.body

    try {
        const updateResult = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { niches: data } })
        if (updateResult.modifiedCount === 1) {
            res.send(true)
        } else {
            res.send(false)
        }
    } catch (err) {
        console.error(err)
        res.status(500)
    }

})

app.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const query = { email: email }
        const cursor = collection.find(query)
        const results = await cursor.toArray()

        console.log(results.length?'email found':'not found')

        if (results.length) {
            if (password === results[0].password) {
                res.send(results[0]._id.toString())
            } 
            else
                res.send('pass')
        } else {
            res.send('email')
        }

        
    } catch (err) {
        console.error(err)
        res.status(500)
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => { // Destroy the session
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

app.get('/user/:id', async (req, res) => {
    var id = req.params.id
    try {
        const query = { _id: new ObjectId(id) }
        const cursor = collection.find(query)
        const results = await cursor.toArray()
        res.send(results[0].niches)
    } catch (e) {
        console.log(e)
    }
})

app.listen(port, () => {
    console.log('Listening at port ' + port)
})