const http = require('http');
const server = http.createServer((req,res)=>{
res.statusCode = 200;
res.setHeader("Content-Type","text/plain");
res.end("Hello World");
});
const port = 5050
server.listen(5050,()=>{
console.log("server running");
});