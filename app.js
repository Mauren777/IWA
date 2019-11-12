const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
})
 
app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
});