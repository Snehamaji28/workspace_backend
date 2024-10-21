const express = require("express");
const { markAttendance, fetchAttendanceHistory } = require("../controllers/attendance.controller");
const { authenticateJWT } = require("../middleware/authMiddleware"); // Ensure this middleware is implemented for JWT verification

const router = express.Router();

// Protected Routes
router.post("/mark", authenticateJWT, markAttendance); // Route to mark attendance
router.get("/history", authenticateJWT, fetchAttendanceHistory); // Route to get attendance history

module.exports = router;
