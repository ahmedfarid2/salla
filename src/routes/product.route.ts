import express from "express";
import { fetchProducts } from "../services/product.service";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await fetchProducts();
  res.status(200).send(products);
});

export default router;
