import express from "express";
import { login, register } from "../services/user.service";

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

export default router;
