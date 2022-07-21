const express = require('express');
const helmet = require('helmet');
const router = require('./routes/distanceTable.js'); 
const config = require('config');
const cors = require('cors')

const PORT = config.get('PORT') || 5000;

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use(router);

const start = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    });
  } catch (error) {
    
  }
}

start();