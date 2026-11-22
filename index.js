const http = require('http');
const fs = require('fs');
const path = require('path');

const routes = {
    '/': 'index.html',
    '/about': 'about.html',
};

function serveFile(filePath, statusCode, response) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            return response.end('500: Server error');
        }
        response.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(data);
    });
}

const server = http.createServer(function(request, response) {
    console.log(`${request.method} ${request.url}`);

    const fileName = routes[request.url];

    if (fileName) {
        const filePath = path.join(__dirname, 'pages', fileName);
        return serveFile(filePath, 200, response);
    }

    const notFoundPath = path.join(__dirname, 'pages', '404.html');
    serveFile(notFoundPath, 404, response);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
