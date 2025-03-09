import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route";
import productRoute from "./routes/product.route";
import cartRoute from "./routes/cart.route";
import dotenv from "dotenv";
import { seedInitialProducts } from "./services/product.service";

const app = express();
dotenv.config();
const port = 3001;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/dentacarts?authSource=admin")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Failed to connect MongoDB: ${err}`));

seedInitialProducts();

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
