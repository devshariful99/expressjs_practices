const http = require('http');

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;

    if (method === 'GET' && url === '/') {
        res.end('Hello, World!');
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
