const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Connected to database: ${conn.connection.host} `);
  } catch (error) {
    console.log(`Error connecting to database: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
