const express = require("express");
const dotenv = require("dotenv");

// Importing Configuration Variables
dotenv.config({ path: "./config/config.env" });

// Initializing Server
const app = express();

// PORT on which the Server will be Running.
const PORT = process.env.PORT || 5000;

// Making the Server Listen
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} enviornment at PORT ${PORT}`
  )
);
