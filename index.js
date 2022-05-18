const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.70jcb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async() => {
    try{
        await client.connect();
        const taskCollection = client.db('todoApp').collection('tasks');

        app.get('/task', async(req, res) => {
            const query = {};
            const cursor = taskCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);
        })
    }
    finally{

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running To Do server');
})

app.listen(port, () => {
    console.log('Listening to port', port);
})