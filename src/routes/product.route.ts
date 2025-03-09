import express from "express";
import { fetchProducts } from "../services/product.service";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { data, statuscode } = await fetchProducts();
    res.status(statuscode).send(data);
  } catch (err) {
    res.status(500).send("Something went wrong! Please try again later.");
  }
});

export default router;
