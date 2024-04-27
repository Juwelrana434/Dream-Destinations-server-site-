const express = require('express');
const tourspots = require('./Tourists spot.json');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// Tourists spot section data upload to mongodb server
app.get('/tourspots', (req, res) => {
res.send(tourspots);
})
app.get('/tourspots/:id', (req, res) =>{
const id = parseInt(req.params.id);
console.log(id);
const tourspot = tourspots.find(tourspot => tourspot.id === id) || {};
res.send(tourspot);
})

// for server run  
app.get('/', (req, res) =>{
res.send('Dream Destination Server is running')
})

app.listen(port, () => {
console.log(`Dream Destination Server is running on port:${port}`)
})