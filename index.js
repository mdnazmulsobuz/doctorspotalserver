const express = require('express');
const app = express();
const cors =require('cors');
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;
require ('dotenv').config()
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello Doctors Portal!')
})

app.listen(port, () => {
  console.log(`listening at ${port}`)
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jo3sa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        console.log('Database connected sucessfully');
    }
    finally{
        // await client.close();
    }   
}

run().catch(console.dir);