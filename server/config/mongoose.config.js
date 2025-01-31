const mongoose = require("mongoose");
const db = "color_master_db";

mongoose
  // .connect(`mongodb://127.0.0.1:27017/${db}`, {
  .connect(`${process.env.DB_URI}${db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Established a connection to ${db}`))
  .catch((err) =>
    console.log(`Something went wrong when connecting to ${db}`, err)
  );
