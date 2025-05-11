import express from "express";
import { fetchMyOrders, login, register } from "../services/user.service";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { data, statuscode } = await register({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(statuscode).json(data);
  } catch (err) {
    res.status(500).send("Something went wrong! Please try again later.");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, statuscode } = await login({
      email,
      password,
    });

    res.status(statuscode).json(data);
  } catch (err) {
    res.status(500).send("Something went wrong! Please try again later.");
  }
});

router.get("/my-orders", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { data, statusCode } = await fetchMyOrders({ userId});
    res.status(statusCode).send(data);
  } catch (err) {
    res.status(500).send("Something went wrong! Please try again later.");
  }
});

export default router;
