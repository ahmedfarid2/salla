import express from "express";
import {
  postItemToCart,
  fetchCart,
  putItemInCart,
  deleteItemFromCart,
  clearCart,
  checkout,
} from "../services/cart.service";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { data, statusCode } = await fetchCart({ userId });
    res.status(statusCode).send(data);
  } catch (err) {
    res.status(500).send("Something went wrong! Please try again later.");
  }
});

router.post("/item", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const { data, statusCode } = await postItemToCart({
      userId,
      productId,
      quantity,
    });
    res.status(statusCode).send(data);
  } catch (err) {
    res.status(500).send("Something went wrong! Please try again later.");
  }
});

router.put("/item", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const { data, statusCode } = await putItemInCart({
      userId,
      productId,
      quantity,
    });
    res.status(statusCode).send(data);
  } catch (err) {
    res.status(500).send("Something went wrong! Please try again later.");
  }
});

router.delete(
  "/item/:productId",
  validateJWT,
  async (req: ExtendRequest, res) => {
    try {
      const userId = req?.user?._id;
      const { productId } = req.params;
      const { data, statusCode } = await deleteItemFromCart({
        userId,
        productId,
      });
      res.status(statusCode).send(data);
    } catch (err) {
      res.status(500).send("Something went wrong! Please try again later.");
    }
  }
);

router.delete("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { data, statusCode } = await clearCart({ userId });
    res.status(statusCode).send(data);
  } catch (err) {
    res.status(500).send("Something went wrong! Please try again later.");
  }
});

router.post("/checkout", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { address } = req.body;
    const { data, statusCode } = await checkout({ userId, address });
    res.status(statusCode).send(data);
  } catch (err) {
    res.status(500).send("Something went wrong! Please try again later.");
  }
});

export default router;
