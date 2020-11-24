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



const h1 = require('./backend/routes/h1/index');
const h2 = require('./backend/routes/h2/index');
const h3 = require('./backend/routes/h3/index');
const h4 = require('./backend/routes/h4/index');
const h5 = require('./backend/routes/h5/index');
const h6 = require('./backend/routes/h6/index');
const h7 = require('./backend/routes/h7/index');
const h8 = require('./backend/routes/h8/index');
const h9 = require('./backend/routes/h9/index');
const h10 = require('./backend/routes/h10/index');
const h11 = require('./backend/routes/h11/index');
const h12 = require('./backend/routes/h12/index');
const h13 = require('./backend/routes/h13/index');
const h14 = require('./backend/routes/h14/index');
const h15 = require('./backend/routes/h15/index');
const h16 = require('./backend/routes/h16/index');
const h17 = require('./backend/routes/h17/index');
const h18 = require('./backend/routes/h18/index');
const h19 = require('./backend/routes/h19/index');
const h20 = require('./backend/routes/h20/index');
const h21 = require('./backend/routes/h21/index');
const h22 = require('./backend/routes/h22/index');
app.use('/scrap/data', h22);
app.use('/scrap/data', h21);
app.use('/scrap/data', h20);
app.use('/scrap/data', h19);
app.use('/scrap/data', h18);
app.use('/scrap/data', h17);
app.use('/scrap/data', h16);
app.use('/scrap/data', h15);
app.use('/scrap/data', h14);
app.use('/scrap/data', h13);
app.use('/scrap/data', h12);
app.use('/scrap/data', h11);
app.use('/scrap/data', h10);
app.use('/scrap/data', h9);
app.use('/scrap/data', h8);
app.use('/scrap/data', h7);
app.use('/scrap/data', h6);
app.use('/scrap/data', h5);
app.use('/scrap/data', h4);
app.use('/scrap/data', h3);
app.use('/scrap/data', h1);
app.use('/scrap/data', h2);

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
