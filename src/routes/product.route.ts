import express from "express";
import { fetchProducts } from "../services/product.service";

const router = express.Router();

router.get("/", async (req, res) => {
  const { data, statuscode } = await fetchProducts();
  res.status(statuscode).send(data);
});

export default router;
