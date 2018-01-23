const express = require('express'),
  app = express(),
  PORT = process.env.PORT || 3000;

app.use('/favicon.ico', express.static('public/favicon.ico'));

app.use(express.static('public', { maxAge: 3 * 60 * 60 * 1000 }));

app.listen(PORT, console.log(`server is running on port ${ PORT }`));