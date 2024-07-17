const express = require('express')
const cors = require('cors')
const { MongoClient, ObjectId } = require('mongodb')

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

let cachedClient = null;

async function connect() {
    if (cachedClient) return cachedClient;
    try {
        cachedClient = await MongoClient.connect('mongodb+srv://root:root@tasks.jrjhcnd.mongodb.net/?retryWrites=true&w=majority&appName=tasks', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
        return cachedClient;
    } catch (e) {
        console.error(e);
        throw e; // Re-throw to handle in the calling function
    }
}

connect()

<<<<<<< HEAD
app.get('/',(req,res)=>{
    res.send('working')
=======
app.get("/",(req,res)=>{
    res.send('Working')
>>>>>>> a9de892ed7aad759c3152376031ee73349085de8
})

app.post('/adduser', async (req, res) => {
    const data = req.body
    try {
        const client = await connect();
        const db = client.db("users");
        const collection = db.collection("users");

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
        const client = await connect();
        const db = client.db("users");
        const collection = db.collection("users");
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
        const client = await connect();
        const db = client.db("users");
        const collection = db.collection("users");
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
        const client = await connect();
        const db = client.db("users");
        const collection = db.collection("users");
        const query = { email: email }
        const cursor = collection.find(query)
        const results = await cursor.toArray()

        console.log(results.length ? 'email found' : 'not found')

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

app.get('/user/:id', async (req, res) => {
    var id = req.params.id
    try {
        const client = await connect();
        const db = client.db("users");
        const collection = db.collection("users");
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

