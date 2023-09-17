const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const port = 8000;

require('dotenv').config();
require("./config/mongoose.config");
require("./config/jwt.config");

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json(), express.urlencoded({ extended: true }));

//! routes has to be after everything else 
//! if this is moved the app will break
//! and Chris will be sad
const UserRoutes = require("./routes/user.routes");
const ColorRoutes = require("./routes/color.routes");
const PaletteRoutes = require("./routes/palette.routes");
UserRoutes(app);
ColorRoutes(app);
PaletteRoutes(app);


app.listen(port, () => console.log(`Server live on port: ${port}`));
