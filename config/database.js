const config = require("config");
const mongoose = require("mongoose");

const dataBase = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(dataBase, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MONGODB is Connected to Atlas");
  } catch (err) {
    console.log(err);
    // Exit if Error occurs
    process.exit(1);
  }
};
module.exports = connectDB;
