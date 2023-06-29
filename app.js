require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.port || 5000;

//route
app.get('*', (req,res)=>{
    res.send('hello world');
})

// connect DB
const db = require('./db/connect');

// connect DB and run server
const start = async () => {
  await db(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server is listening port ${port}...`);
  });
}

start();