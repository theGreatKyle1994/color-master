const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8000;

require("dotenv").config();
require("./config/mongoose.config");
require("./config/jwt.config");

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5000",
    credentials: true,
  }),
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: true })
);

//! routes has to be after everything else
//! if this is moved the app will break
//! and Chris will be sad
require("./routes/user.routes")(app);
require("./routes/color.routes")(app);
// require("./routes/palette.routes")(app);

app.listen(port, () => console.log(`Server live on port: ${port}`));
