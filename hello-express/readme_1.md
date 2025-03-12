Here's a simple "Hello World" GET API using Express:

1. First, create a new directory for your project and navigate into it:
   ```bash
   mkdir hello-express
   cd hello-express
   ```

2. Initialize a new Node.js project:
   ```bash
   npm init -y
   ```

3. Install Express:
   ```bash
   npm install express
   ```

4. Create a file named `app.js` and add the following code:

   ```javascript
   const express = require('express');
   const app = express();
   const port = 3000;

   // Define a simple GET route
   app.get('/', (req, res) => {
     res.send('Hello World!');
   });

   // Start the server
   app.listen(port, () => {
     console.log(`Server is running on http://localhost:${port}`);
   });
   ```

5. To run the server, execute:
   ```bash
   node app.js
   ```

Now, if you visit `http://localhost:3000` in your browser or use a tool like Postman, you should see the "Hello World!" message.

Let me know if you need further assistance!