const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require('dotenv').config();

const authRoutes = require("./routes/auth.routes");
const organizerRoutes = require("./routes/organizer.routes");
const eventRoutes = require("./routes/event.routes");
const ticketRoutes = require("./routes/ticket.routes");
const volunteerRoutes = require("./routes/volunteer.routes");
const adminRoutes = require("./routes/admin.routes");
const { seedRootAdmin } = require("../src/utils/seedAdmin.util");

const app = express();

app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}));

// Rate limiting to prevent brute-force and DDoS
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use("/api/", apiLimiter);

// Body Parsing Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Seed Admin - Ensure this is handled correctly in prod
// seedRootAdmin(); 

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/organizer", organizerRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/admin", adminRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'production'
            ? 'Internal Server Error'
            : err.message
    });
});

module.exports = app;
