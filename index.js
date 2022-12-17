const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qhhqtot.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {


    try {

        const pesonalDetailsCollection = client.db('oldGolden').collection('persolanDetails');
        const bussinessDetailsCollection = client.db('oldGolden').collection('bussinessDetails');
        const loanDetailsCollection = client.db('oldGolden').collection('loanDetails');


        app.post('/personaldetails', async (req, res) => {
            const pesonalDetails = req.body;
            const result = await pesonalDetailsCollection.insertOne(pesonalDetails)
            res.send(result);
        })

        app.post('/businessdetails', async (req, res) => {
            const businessDetails = req.body;
            const result = await bussinessDetailsCollection.insertOne(businessDetails)
            res.send(result);
        })
        app.post('/loandetails', async (req, res) => {
            const loanDetails = req.body;
            const result = await loanDetailsCollection.insertOne(loanDetails)
            res.send(result);
        })

    }


    finally {

    }
}
run().catch(console.log);


app.get('/', async (req, res) => {
    res.send('server is running ')
})

app.listen(port, () => console.log(`server is running ${port}`))
