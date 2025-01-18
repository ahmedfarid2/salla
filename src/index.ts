import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = 3000;

app.use(express.json());

mongoose
  .connect(
    "mongodb://admin:passphrase@localhost:27017/dentacarts?authSource=admin"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Failed to connect MongoDB: ${err}`));

app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
