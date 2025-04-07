const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// Set view engine to EJS
app.set('view engine', 'ejs');

// Static Middleware
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res, next) {
    res.render('home');
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
