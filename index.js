const express = require('express');
const app = express();
const cors =require('cors');
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;
require ('dotenv').config();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jo3sa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
      const database = client.db('doctors_protal');
      const appointmentsCollection = database.collection('appointments');
      const usersCollection = database.collection('users');


        app.get('/appointments', async (req, res) =>{
        const email = req.query.email;
        const date = new Date(req.query.date).toLocaleDateString();
        const query = {email: email, date: date}
        const cursor = appointmentsCollection.find(query);
        const appointments = await cursor.toArray();
        res.json(appointments);
      });

      app.post('/appointments', async(req, res) => {
        const appointment = req.body;
        const result = await appointmentsCollection.insertOne(appointment);
        res.json(result);
      });

      app.post('/users', async(req, res) =>{
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        console.log(result);
        res.json(result);
      });

      app.put('/users', async (req, res) =>{
        const user = req.body;
        const filter = {email : user.email};
        const options = {upsert: true};
        const updateDoc = {$set: user};
        const result = usersCollection.updateOne(filter, updateDoc, options);
        res.json(result);

      })

      }
    finally{
        // await client.close();
    }   
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello Doctors Portal!')
})

app.listen(port, () => {
  console.log(`listening at ${port}`)
})
