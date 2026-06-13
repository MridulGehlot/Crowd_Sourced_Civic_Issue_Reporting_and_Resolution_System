const express = require('express')
const app = express();
const port = 5050;
app.get("/",(req,res)=>{
res.send("Hii");
});
app.listen(port,()=>{
console.log(`server running on port : ${port}`);
});