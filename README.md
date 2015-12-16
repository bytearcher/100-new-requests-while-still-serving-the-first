# Aargh, 100 new requests while still serving the first one!

Node.js has only one thread processing JavaScript code. What happens if a request comes in and a file needs to be read from the disk, and in the meantime there are 100 new incoming connections?

_Wouldn't the file read callback have to wait until all the other connections are served?_

Well, yes, the callback would have to wait for other events to be processed first. But it's all very ok.

## Test case

Run

```
npm install
bash run.sh
```

and you'll see that file read initiated from serving request #1 completes only after other requests have arrived.


```
serving request #1
serving request #2
serving request #3
.
.
.
serving request #99
serving request #100
file read for request #1 complete

```
