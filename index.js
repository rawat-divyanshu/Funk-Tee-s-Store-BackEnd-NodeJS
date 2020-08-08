const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const mongoose = require("mongoose");

// Importing Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

// Importing Configuration Variables
dotenv.config({ path: "./config/config.env" });

// Initializing Server
const app = express();

// Connecting to DB
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

// PORT on which the Server will be Running.
const PORT = process.env.PORT || 5000;

// Making the Server Listen
app.listen(
  PORT,
  console.log(
    `SERVER IS RUNNING IN ${process.env.NODE_ENV} ENVIORNMENT AT PORT ${PORT}`
  )
);
