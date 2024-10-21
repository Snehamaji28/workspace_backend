const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    employeeId: {
        type: String,
        required: true,
        unique: true, // Ensure employee ID is unique
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: true, // Ensure email is unique
    },
    password: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        default: "Employee"
    },
    attendanceRecords: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendance"
    }],
    lastAttendance: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Employee', employeeSchema);
