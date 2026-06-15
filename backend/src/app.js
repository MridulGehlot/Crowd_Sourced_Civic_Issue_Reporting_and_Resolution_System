const express = require("express");
const cors=require("cors");
const helmet=require("helmet");
const morgan=require("morgan");
const cookieParser=require("cookie-parser");
const errorMiddleware=require("./middleware/errorMiddleware");
const ApiError=require("./utils/ApiError");
const authRoutes = require("./routes/auth.routes");
const issueRoutes = require("./routes/issue.routes")

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


app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});
app.get("/health", (req, res) => {
    res.status(200).json({message : "Working"});    
});

app.get("/error",(req,res)=>{
    throw new ApiError(404,"Not Found");
})

app.use(errorMiddleware);

module.exports = app;