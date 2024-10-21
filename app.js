const express = require("express");
const app = express();
require('dotenv').config();
const db = require('./configs/mongooseConnection');
const cookieParser = require('cookie-parser');
const employeeRouter = require("./routes/Employee");
const Attendance = require('./models/attendance.model');
const Employee = require('./models/employee.model');
const cors = require("cors");

const allowedOrigins = [
  'http://localhost:5173', // Adjust the port if necessary
  'https://workspace-frontend-seven.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Proceed with the request
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request
    }
  },
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json()); 

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=>{
  res.send("error");
});
// Use the employeeRouter for the /api/emp endpoint
app.use('/api/emp', employeeRouter);
// app.use("/api/attendance", attendanceRoutes); // Attendance routes

app.listen(PORT, () => {
  console.log(`App is running!`);
});
