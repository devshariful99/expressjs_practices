const express = require('express'); // Import the express module
const app = express(); // Create an express application
const port = 3000; // Set the port number

// Define a simple GET route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// Now, let's run the app:
// $ node app.js
// Server is running on http://localhost:3000   
// Open your browser and navigate to http://localhost:3000. You should see "Hello World!" displayed on the page.
//
// You can also use the curl command to test the server:
// $ curl http://localhost:3000
// Hello World!
// The curl command sends an HTTP GET request to the server, and the server responds with "Hello World!".
//
// To stop the server, press Ctrl + C in the terminal.
//
// In the next section, we'll learn how to create a REST API with Express.
