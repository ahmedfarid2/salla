import express from "express";
import { login, register } from "../services/user.service";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { data, statuscode } = await register({
    firstName,
    lastName,
    email,
    password,
  });

  res.status(statuscode).send(data);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data, statuscode } = await login({
    email,
    password,
  });

  res.status(statuscode).send(data);
});

export default router;
