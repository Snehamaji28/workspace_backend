const express = require("express");
const mongoose = require("mongoose");
const Employee = require("../models/employee.model");
const Attendance = require("../models/attendance.model");
const createToken = require("../utils/jwtUtils");

const attenEmployee = async (req, res) => {
    const employeeId = req.user.id;

    try {
        // Find the employee by ID
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found." });
        }

        // Create a new attendance record
        const newAttendance = new Attendance({
            employeeId: employee._id,
        });

        // Save the new attendance record
        await newAttendance.save();

        // Push the new attendance record to the employee's attendanceRecords array
        employee.attendanceRecords.push(newAttendance._id);
        employee.lastAttendance = Date.now(); // Update last attendance timestamp
        await employee.save();
        
        console.log("atten executed!");
        res.status(201).json({ message: "Attendance marked successfully." });
    } catch (error) {
        // console.error("Error creating attendance record:", error.message);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};



// Register Employee
const registerEmployee = async (req, res) => {
    const { fullname, employeeId, email, password, position } = req.body;

    try {
        // Check if the employee already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: "Employee already exists." });
        }

        // Create new employee
        const employee = new Employee({
            fullname,
            employeeId,
            email,
            password,
            position,
        });

        await employee.save();

        res.status(201).json({ message: "Employee registered successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

const loginEmployee = async (req, res) => {
    const { employeeId, password } = req.body;

    try {
        const employee = await Employee.findOne({ employeeId });
        if (!employee || employee.password !== password) {
            return res.status(400).json({ message: "Invalid employeeId or password." });
        }

        // Create JWT token
        const token = createToken(employee._id);

        // Set JWT token as a cookie with 30 days expiry
        res.cookie("token", token, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
        });

        res.status(200).json({ message: "Login successful." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

// Logout Employee
const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful." });
};

// Get Employee Profile (Protected Route Example)
const getEmployee = async (req, res) => {
    try {
        // Find employee by ID extracted from JWT
        const employee = await Employee.findById(req.user.id).populate("attendanceRecords");
        // console.log(req.user);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found." });
        }

        // Send only the required fields
        res.status(200).json({
            id: employee.employeeId,
            fullname: employee.fullname,
            joiningDate: employee.createdAt.toISOString().split('T')[0], // Format date as YYYY-MM-DD
            email: employee.email,
            lastAttendance: employee.lastAttendance,
            attendanceRecords: employee.attendanceRecords,
            position: employee.position
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};


module.exports = { registerEmployee, loginEmployee, logout, getEmployee, attenEmployee };
