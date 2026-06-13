const express = require("express");
const cors=require("cors");
const helmet=require("helmet");
const morgan=require("morgan");
const cookieParser=require("cookie-parser");

const app = express();

//security middleware
app.use(helmet());

//logging middleware
app.use(morgan("dev"));

//CORS Middleware
app.use(cors());

//parse url encoded data
app.use(express.urlencoded(
    {
        extended:true
    }
));

//parse cookies
app.use(cookieParser());

// Parse JSON
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

module.exports = app;