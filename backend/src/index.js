require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/post.route");

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(`${process.env.MONGO_STRING}`)
  .then(() => {
    console.log("Mongo Connected");
  })
  .catch((err) => console.log(err));
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server listening on ${process.env.PORT}`);
});
