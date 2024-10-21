const express = require("express");
const app = express();
require('dotenv').config();
const db = require('./configs/mongooseConnection');
const cookieParser = require('cookie-parser');
const employeeRouter = require("./routes/Employee");
const Attendance = require('./models/attendance.model');
const Employee = require('./models/employee.model');

// const attendanceRoutes = require("./routes/attendance.routes");

app.use(express.json()); 

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const PORT = process.env.PORT || 3000;

const exampleEmployee = {
  id: "EMP12345",
  name: "Sree Gopal Saha",
  joiningDate: "2022-01-15",
  email: "johnheljlkjd@example.com"
};

app.get("/", (req, res)=>{
  res.send("error");
});
// Use the employeeRouter for the /api/emp endpoint
app.use('/api/emp', employeeRouter);
// app.use("/api/attendance", attendanceRoutes); // Attendance routes

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
