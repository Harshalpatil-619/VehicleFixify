const express =require("express");
const errorHandler=require("./Middleware/errorHandler");
const dotenv=require("dotenv").config();
const connectDb=require("./Config/dbconnection");

const app =express();
connectDb();

const port=process.env.PORT || 5000;


app.use(express.json());

app.use("/api/faulttofixs",require("./routes/faulttofixRoute"));
app.use("/api/employees",require("./routes/employeeRoute"));
app.use(errorHandler);
app.listen(port,()=>console.log(`server is running on port : ${port}`));
 