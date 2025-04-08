const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Custom middleware
app.use((req, res, next) => {
    console.log(`Middleware Accepted`);
    next();
});

// GET route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// POST route
app.post('/test', (req, res) => {
    console.log(req.body);
    res.send("Data Received!");
});

app.get('/error-demo', (req, res, next) => {
    const error = new Error("Something bad happened!");
    next(error); // This triggers the error handler
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server established on port -> ${port}`);
});
