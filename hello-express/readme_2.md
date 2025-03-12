Here's an extended version of the previous example with REST API routes for `POST`, `PUT`, `PATCH`, and `DELETE`:

1. Update the `app.js` file to include additional routes:

   ```javascript
   const express = require('express');
   const app = express();
   const port = 3000;

   // Middleware to parse JSON request bodies
   app.use(express.json());

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
   ```

2. **Explanation of the new routes:**
   - **POST `/data`**: Accepts a JSON body and simulates creating new data.
   - **PUT `/data/:id`**: Accepts an ID parameter and a JSON body to simulate updating data.
   - **PATCH `/data/:id`**: Accepts an ID parameter and a JSON body to simulate partially updating data.
   - **DELETE `/data/:id`**: Accepts an ID parameter and simulates deleting the data.

3. **Testing the API:**
   - **GET**: `http://localhost:3000/` — Returns "Hello World!".
   - **POST**: `http://localhost:3000/data` — Send a JSON object in the body to create data (e.g., `{ "name": "John" }`).
   - **PUT**: `http://localhost:3000/data/1` — Send a JSON object in the body to update data with ID `1` (e.g., `{ "name": "Jane" }`).
   - **PATCH**: `http://localhost:3000/data/1` — Send a JSON object in the body to partially update data with ID `1`.
   - **DELETE**: `http://localhost:3000/data/1` — Simulates deleting the data with ID `1`.

4. **Run the server:**
   ```bash
   node app.js
   ```

Now you have a simple Express app with full REST API functionality! Let me know if you need more features or have questions!