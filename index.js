const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//HIMANK MONGODB URI
// const URI = `mongodb+srv://user:s3oTPRp8I89vZ6qC@cluster0.r2ehn.mongodb.net/Jobs?retryWrites=true&w=majority`;
// mongoose
//   .connect(URI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected..."))
//   .catch((err) => console.log(err));

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0-nbxxl.mongodb.net/jobsSkillUnga?retryWrites=true&w=majority",
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

const emailRoute = require("./backend/api/email");
const jobsRoute = require("./backend/api/jobs");
const emailSendRoute = require("./backend/api/functions/sendEmail");

app.use("/api/email", emailRoute);
app.use("/api/jobs", jobsRoute);
app.use("/api/email", emailSendRoute);

const h1 = require("./backend/routes/h1/index");
const h2 = require("./backend/routes/h2/index");
const h3 = require("./backend/routes/h3/index");
const h4 = require("./backend/routes/h4/index");
const h5 = require("./backend/routes/h5/index");
const h6 = require("./backend/routes/h6/index");
const h7 = require("./backend/routes/h7/index");
const h8 = require("./backend/routes/h8/index");
const h9 = require("./backend/routes/h9/index");
const h10 = require("./backend/routes/h10/index");
const h11 = require("./backend/routes/h11/index");
const h12 = require("./backend/routes/h12/index");
const h13 = require("./backend/routes/h13/index");
const h14 = require("./backend/routes/h14/index");
const h15 = require("./backend/routes/h15/index");
const h16 = require("./backend/routes/h16/index");
const h17 = require("./backend/routes/h17/index");
const h18 = require("./backend/routes/h18/index");
const h19 = require("./backend/routes/h19/index");
const h20 = require("./backend/routes/h20/index");
const h21 = require("./backend/routes/h21/index");
const h22 = require("./backend/routes/h22/index");
const h23 = require("./backend/routes/h23-test/index"); //TEST ROUTE
app.use("/scrap/data", h23); //TEST ROUTE
app.use("/scrap/data", h22);
app.use("/scrap/data", h21);
app.use("/scrap/data", h20);
app.use("/scrap/data", h19);
app.use("/scrap/data", h18);
app.use("/scrap/data", h17);
app.use("/scrap/data", h16);
app.use("/scrap/data", h15);
app.use("/scrap/data", h14);
app.use("/scrap/data", h13);
app.use("/scrap/data", h12);
app.use("/scrap/data", h11);
app.use("/scrap/data", h10);
app.use("/scrap/data", h9);
app.use("/scrap/data", h8);
app.use("/scrap/data", h7);
app.use("/scrap/data", h6);
app.use("/scrap/data", h5);
app.use("/scrap/data", h4);
app.use("/scrap/data", h3);
app.use("/scrap/data", h1);
app.use("/scrap/data", h2);

const s1 = require("./backend/routes/s1/index");
const s2 = require("./backend/routes/s2/index");
const s3 = require("./backend/routes/s3/index");
const s4 = require("./backend/routes/s4/index");
const s5 = require("./backend/routes/s5/index");
const s6 = require("./backend/routes/s6/index");
const s7 = require("./backend/routes/s7/index");
const s8 = require("./backend/routes/s8/index");
const s9 = require("./backend/routes/s9/index");
const s10 = require("./backend/routes/s10/index");
const s11 = require("./backend/routes/s11/index");
const s12 = require("./backend/routes/s12/index");
const s13 = require("./backend/routes/s13/index");
const s14 = require("./backend/routes/s14/index");
const s15 = require("./backend/routes/s15/index");
const s16 = require("./backend/routes/s16/index");
const s17 = require("./backend/routes/s17/index");
const s18 = require("./backend/routes/s18/index");
const s19 = require("./backend/routes/s19/index");
const s20 = require("./backend/routes/s20/index");
const s21 = require("./backend/routes/s21/index");
const s22 = require("./backend/routes/s22/index");
const s23 = require("./backend/routes/s23/index");
const s24 = require("./backend/routes/s24/index");
const s25 = require("./backend/routes/s25/index");
const s26 = require("./backend/routes/s26/index");
const s27 = require("./backend/routes/s27/index");
const s28 = require("./backend/routes/s28/index");
const s29 = require("./backend/routes/s29/index");
const s30 = require("./backend/routes/s30/index");
const hirist_s1 = require("./backend/PlatformJobs/scrappers/hirist/routes/hirist_s1/index");
const hirist_s2 = require("./backend/PlatformJobs/scrappers/hirist/routes/hirist_s2/index");
const hirist_s3 = require("./backend/PlatformJobs/scrappers/hirist/routes/hirist_s3/index");
const hirist_s4 = require("./backend/PlatformJobs/scrappers/hirist/routes/hirist_s4/index");
const hirist_s5 = require("./backend/PlatformJobs/scrappers/hirist/routes/hirist_s5/index");
const hirist_s6 = require("./backend/PlatformJobs/scrappers/hirist/routes/hirist_s6/index");
const hirist_s7 = require("./backend/PlatformJobs/scrappers/hirist/routes/hirist_s7/index");

const internshala_s1 = require("./backend/PlatformJobs/scrappers/Internshala/routes/internshala_s1/index");
const internshala_s2 = require("./backend/PlatformJobs/scrappers/Internshala/routes/internshala_s2/index");
const internshala_s3 = require("./backend/PlatformJobs/scrappers/Internshala/routes/internshala_s3/index");
const internshala_s4 = require("./backend/PlatformJobs/scrappers/Internshala/routes/internshala_s4/index");
const internshala_s5 = require("./backend/PlatformJobs/scrappers/Internshala/routes/internshala_s5/index");
const internshala_s6 = require("./backend/PlatformJobs/scrappers/Internshala/routes/internshala_s6/index");

const internshala_h1 = require("./backend/PlatformJobs/scrappers/Internshala/routes/internshala_h1/index");
const internshala_h2 = require("./backend/PlatformJobs/scrappers/Internshala/routes/internshala_h2/index");
const internshala_h3 = require("./backend/PlatformJobs/scrappers/Internshala/routes/internshala_h3/index");
const internshala_h4 = require("./backend/PlatformJobs/scrappers/Internshala/routes/internshala_h4/index");
const internshala_h5 = require("./backend/PlatformJobs/scrappers/Internshala/routes/internshala_h5/index");
const internshala_h6 = require("./backend/PlatformJobs/scrappers/Internshala/routes/internshala_h6/index");
app.use("/scrap/data/internshala", internshala_h1);
app.use("/scrap/data/internshala", internshala_h2);
app.use("/scrap/data/internshala", internshala_h3);
app.use("/scrap/data/internshala", internshala_h4);
app.use("/scrap/data/internshala", internshala_h5);
app.use("/scrap/data/internshala", internshala_h6);

app.use("/scrap/data/internshala", internshala_s1);
app.use("/scrap/data/internshala", internshala_s2);
app.use("/scrap/data/internshala", internshala_s3);
app.use("/scrap/data/internshala", internshala_s4);
app.use("/scrap/data/internshala", internshala_s5);
app.use("/scrap/data/internshala", internshala_s6);

app.use("/scrap/data/hirist", hirist_s7);
app.use("/scrap/data/hirist", hirist_s6);
app.use("/scrap/data/hirist", hirist_s5);
app.use("/scrap/data/hirist", hirist_s4);
app.use("/scrap/data/hirist", hirist_s3);
app.use("/scrap/data/hirist", hirist_s2);
app.use("/scrap/data/hirist", hirist_s1);
app.use("/scrap/data", s30);
app.use("/scrap/data", s29);
app.use("/scrap/data", s28);
app.use("/scrap/data", s27);
app.use("/scrap/data", s26);
app.use("/scrap/data", s25);
app.use("/scrap/data", s24);
app.use("/scrap/data", s23);
app.use("/scrap/data", s22);
app.use("/scrap/data", s21);
app.use("/scrap/data", s20);
app.use("/scrap/data", s19);
app.use("/scrap/data", s18);
app.use("/scrap/data", s17);
app.use("/scrap/data", s16);
app.use("/scrap/data", s15);
app.use("/scrap/data", s14);
app.use("/scrap/data", s13);
app.use("/scrap/data", s12);
app.use("/scrap/data", s11);
app.use("/scrap/data", s10);
app.use("/scrap/data", s9);
app.use("/scrap/data", s8);
app.use("/scrap/data", s7);
app.use("/scrap/data", s6);
app.use("/scrap/data", s5);
app.use("/scrap/data", s4);
app.use("/scrap/data", s3);
app.use("/scrap/data", s2);
app.use("/scrap/data", s1);

const h1Rescrap = require("./backend/rescrap/h1/index");
app.use("/rescrap/data", h1Rescrap);
const testRescrap = require("./backend/rescrap/rescraph1");
app.use("/rescrap/data", testRescrap);
const emailSend = require("./backend/api/functions/sendEmail");
app.use("/test", emailSend);

app.get("/cronjobs", async (req, res) => {
  return res.send("Cron Jobs");
});

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

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
