const express = require('express');
const app = express(); // Express app instance

app.get('/', (req, res) => {
  // This is the hello world route
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});