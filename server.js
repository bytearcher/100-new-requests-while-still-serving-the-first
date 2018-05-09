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

    /*
    /   Serve a file for request #1 and #82 and nothing for the rest.
    /   file1.txt is 'heavier' than file82.txt so the former should take more
    /   time to be fulfilled (its request will likely be the latest one
    /   to be logged).
    */
    if (req.requestNumber == 1 || req.requestNumber == 82) {
        fs.readFile(`file${req.requestNumber}.txt`, "utf8", (err, data) => {
            console.log(`file read for request #${req.requestNumber} complete`);
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
}, 10 * 1000);
