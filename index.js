require("dotenv").config();
const express = require("express");
const corsMiddleWare = require("cors");
const { PORT } = require("./config/constants");
const userRouter = require("./routers/user");

const app = express();

//middleware
const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);
app.use(corsMiddleWare());

app.use("/", userRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
