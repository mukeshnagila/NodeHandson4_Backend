const express = require("express");
const app = express();
Port = 2005;
const cors = require("cors");
const userRouter = require("./Routes/userRouter");

app.use(cors({
    origin: "*"
}))
app.use(express.json());
app.use("/api", userRouter);

app.get("/", (req,res) => {
    console.log("This is your Home Page");
    res.send("API is Running Fine,,,, This is HOME page");
});


app.listen(Port, () => {
    try{
        console.log(`Your Server Is Running Fine By Port No -- ${Port}`);
    }catch(err){
        console.log(`Error in starting the server ${err}`);
    }
})