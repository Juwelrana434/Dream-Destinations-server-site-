const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());





// for server run  
app.get('/', (req, res) =>{
res.send('Dream Destination Server is running')
})

app.listen(port, () => {
console.log(`Dream Destination Server is running on port:${port}`)
})