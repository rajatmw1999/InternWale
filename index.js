const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0-nbxxl.mongodb.net/mediumPostCounter?retryWrites=true&w=majority",
  {
    //useMongoClient: true
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log("Database Connected")
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*"); //'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});



const emailRoute = require('./backend/api/email');
const jobsRoute = require('./backend/api/jobs');

app.use('/api/email', emailRoute);
app.use('/api/jobs', jobsRoute);

// app.get('/c', async(req, res)=>{
//   var d= new Date(Date.now()-6000000000)
//   return res.send("Date = " + d);
// });

// app.get('/c', async(req, res)=>{
//   var d= new Date(Date.now()-1000000000)
//   return res.send("Date = " + d);
// });

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
