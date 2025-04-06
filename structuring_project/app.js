// Core and 3rd Party Modules
const express = require('express');
const router = require('./routes/router'); // assuming your router code is in 'router.js'

// Initialization
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // for parsing JSON request bodies
app.use('/', router);     // mount the router

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
