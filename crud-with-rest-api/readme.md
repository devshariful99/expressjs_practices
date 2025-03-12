The error you're encountering (`Cannot find module 'express'`) means that the `express` module is not installed in your project directory. To resolve this, you need to install the required dependencies.

Here are the steps to fix it:

1. **Navigate to your project directory** (where `app-json.js` is located).

2. **Initialize a new Node.js project** (if you haven't already) by running the following command:
   ```bash
   npm init -y
   ```

3. **Install the required dependencies**:
   Install `express`, `body-parser`, and `cors` by running:
   ```bash
   npm install express body-parser cors
   ```

4. After installation is complete, you can run your application again:
   ```bash
   node .\app-json.js
   ```

This will install `express`, `body-parser`, and `cors` and allow your application to run properly.


---

The error `EADDRINUSE: address already in use :::3000` means that port `3000` is already being used by another process. To resolve this, you have a few options:

### Option 1: Terminate the process using port 3000
1. **Find the process using port 3000**:
   - On **Windows**:
     Open the Command Prompt and run:
     ```bash
     netstat -ano | findstr :3000
     ```
     This will show you the process ID (PID) that is using port 3000.

2. **Kill the process**:
   - Once you get the PID, terminate the process by running:
     ```bash
     taskkill /PID <PID> /F
     ```
     Replace `<PID>` with the actual process ID.

### Option 2: Use a different port
You can change the port your application listens on by modifying the `PORT` in your `app-json.js` file.

For example, change the port from `3000` to `3001`:

```javascript
const PORT = 3001;  // Change the port number to 3001 or any other available port
```

Then run your application again:
```bash
node .\app-json.js
```

### Option 3: Restart your computer
If you're unsure which process is using port `3000`, restarting your computer can free up the port, allowing your application to run without interference.

After resolving the port issue, your application should start successfully.

---

The process with **PID 24808** is using port 3000. You can terminate this process to free up the port by running the following command in Command Prompt:

```bash
taskkill /PID 24808 /F
```

This will forcefully terminate the process, and you should now be able to start your application on port 3000. If you still encounter issues, you might consider restarting your computer or using a different port as mentioned before.