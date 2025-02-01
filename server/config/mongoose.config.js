const mongoose = require("mongoose");
const db = "color_master_db";
const db_uri =
  process.env.NODE_ENV == "production"
    ? process.env.DB_URI
    : process.env.DB_URI_DEV;
console.log(db_uri);

mongoose
  .connect(`${db_uri}${db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Established a connection to ${db}`))
  .catch((err) =>
    console.log(`Something went wrong when connecting to ${db}`, err)
  );
