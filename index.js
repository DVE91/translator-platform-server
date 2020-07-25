require("dotenv").config();
const express = require("express");
const corsMiddleWare = require("cors");
const { PORT } = require("./config/constants");
const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");
const translationRouter = require("./routers/translation");

const app = express();

//middleware
const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);
app.use(corsMiddleWare());

app.use("/", userRouter);
app.use("/", authRouter);
app.use("/", translationRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
