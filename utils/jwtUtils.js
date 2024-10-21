const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET; // Replace with your own secret

const createToken = (employeeId) => {
    return jwt.sign({ id: employeeId }, JWT_SECRET, { expiresIn: '30d' });
};

module.exports = createToken;