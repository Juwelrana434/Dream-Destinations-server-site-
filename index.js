const express = require('express');
const tourspots = require('./Tourists spot.json');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// connect to mongodb server and create uer password
const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASS}@cluster0.ev00748.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    
    const touristCollection = client.db('TouristBD').collection('Tourist');
    
    // data read 
    app.get('/Tourist', async (req, res) => {
      const cursor = touristCollection.find();
      const result = await cursor.toArray();
      res.send(result);
      })
    // for my list data read 
    app.get('/Tourist/email/:email', async (req, res) => {
    // console.log(req.params.email);
      const cursor = touristCollection.find({email:req.params.email});
      const result = await cursor.toArray();
      res.send(result);
      })
    // for view details data read 
    app.get('/Tourist/:id', async (req, res) => {
    // console.log(req.params.id);
      const cursor = touristCollection.findOne({_id : new ObjectId(req.params.id)});
      const result = await cursor;
      res.send(result);
      })
    
    
    // data create 
    app.post('/Tourist', async(req, res ) => {
      const newTouristSpot = req.body;
      console.log(newTouristSpot);
      const result = await touristCollection.insertOne(newTouristSpot);
      res.send(result);
      })
    
    
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// Tourists spot section data upload to mongodb server start
app.get('/tourspots', (req, res) => {
res.send(tourspots);
})
app.get('/tourspots/:id', (req, res) =>{
const id = parseInt(req.params.id);
console.log(id);
const tourspot = tourspots.find(tourspot => tourspot.id === id) || {};
res.send(tourspot);
})
// Tourists spot section data upload to mongodb server end

// for server run  
app.get('/', (req, res) =>{
res.send('Dream Destination Server is running')
})

app.listen(port, () => {
console.log(`Dream Destination Server is running on port:${port}`)
})