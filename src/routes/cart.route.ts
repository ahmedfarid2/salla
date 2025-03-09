import express from "express";
import {
  postItemToCart,
  fetchCart,
  putItemInCart,
  deleteItemFromCart,
  clearCart,
} from "../services/cart.service";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req?.user?._id;
  const { data, statusCode } = await fetchCart({ userId });
  res.status(statusCode).send(data);
});

router.post("/item", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req?.user?._id;
  const { productId, quantity } = req.body;
  const { data, statusCode } = await postItemToCart({
    userId,
    productId,
    quantity,
  });
  res.status(statusCode).send(data);
});

router.put("/item", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req?.user?._id;
  const { productId, quantity } = req.body;
  const { data, statusCode } = await putItemInCart({
    userId,
    productId,
    quantity,
  });
  res.status(statusCode).send(data);
});

router.delete(
  "/item/:productId",
  validateJWT,
  async (req: ExtendRequest, res) => {
    const userId = req?.user?._id;
    const { productId } = req.params;
    const { data, statusCode } = await deleteItemFromCart({
      userId,
      productId,
    });
    res.status(statusCode).send(data);
  }
);

router.delete("/", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req?.user?._id;
  const { data, statusCode } = await clearCart({ userId });
  res.status(statusCode).send(data);
});

export default router;
