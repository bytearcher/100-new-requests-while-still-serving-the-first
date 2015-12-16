var express = require('express');
var fs = require('fs');

var app = express();

// Request number counter as Express middleware
var requestCount = 0;
app.use((req, res, next) => {
    req.requestNumber = ++requestCount;
    next();
});

app.get('/', (req, res) => {
    console.log(`serving request #${req.requestNumber}`);

    // Serve a file for first request and nothing for the rest
    if (req.requestNumber == 1) {
        fs.readFile("file.txt", "utf8", (err, data) => {
            console.log(`file read for request #1 complete`);
            res.send(data);
        });
    } else {
        res.end();
    }
});

var server = app.listen(3000);

// Close server and exit Node.js after a while
setTimeout(() => {
    server.close();
}, 5 * 1000);
