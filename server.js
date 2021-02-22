const express = require("express");

const app = express();
const PORT = process.env.PORT || 8008;
const connectDB = require("./config/database");

// Connect DataBase
connectDB();

// MiddleWare BodyParser inbuilt in express
app.use(express.json({ extendend: false }));

// Test Route
app.get("/", function (req, res) {
  res.send(`Hello Your First get Request`);
});

app.use("/api/users", require("./Routes/api/users"));
app.use("/api/auth", require("./Routes/api/auth"));
app.use("/api/profile", require("./Routes/api/profile"));
app.use("/api/posts", require("./Routes/api/posts"));

// Setting up the Port LocalHost
app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});

