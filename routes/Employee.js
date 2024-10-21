const express = require("express");
const Router = express.Router();
const { registerEmployee, loginEmployee, logout, getEmployee, attenEmployee } = require("../controllers/employeeControllers");
const isLoggedIn = require("../middlewares/isLoggedIn");

Router.get("/",isLoggedIn, getEmployee);

Router.post("/register", registerEmployee);

Router.post("/login", loginEmployee);

Router.post("/attendance", isLoggedIn, attenEmployee);

Router.post("/logout", isLoggedIn, logout);

module.exports = Router;
