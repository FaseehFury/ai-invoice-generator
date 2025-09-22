require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

const app = express();

//Middleware to handle cors

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//connect Database
connectDB();

//Middleware
app.use(express.json());

//Routes Here

app.use("/api/auth", authRoutes);
app.use("/api/invoices", invoiceRoutes);

//Start Server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`);
});
