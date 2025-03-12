const express = require('express'); // Import the express module
const app = express(); // Create an express application
const port = 3000; // Set the port number

// Middleware to parse JSON request bodies
app.use(express.json()); // Parse JSON request bodies

// GET route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// POST route
app.post('/data', (req, res) => {
  const newData = req.body;
  // Simulate storing the data
  res.status(201).json({
    message: 'Data created successfully',
    data: newData
  });
});

// PUT route
app.put('/data/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  // Simulate updating the data
  res.status(200).json({
    message: `Data with ID ${id} updated successfully`,
    data: updatedData
  });
});

// PATCH route
app.patch('/data/:id', (req, res) => {
  const { id } = req.params;
  const partialData = req.body;
  // Simulate partially updating the data
  res.status(200).json({
    message: `Data with ID ${id} partially updated`,
    data: partialData
  });
});

// DELETE route
app.delete('/data/:id', (req, res) => {
  const { id } = req.params;
  // Simulate deleting the data
  res.status(200).json({
    message: `Data with ID ${id} deleted successfully`
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
