import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";
import { ExtendRequest } from "../types/extendedRequest";

const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("Authorization");

  if (!authorizationHeader) {
    res.status(403).send("Authorization header is missing");
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    res.status(403).send("Token is missing");
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET || "", async (err, payload) => {
    if (err || !payload) {
      res.status(403).send("Invalid token");
      return;
    }

    const userPayload = payload as {
      email: string;
      firstName: string;
      lastName: string;
    };

    const user = await userModel.findOne({
      email: userPayload.email,
    });

    req.user = user;
    next();
  });
};

export default validateJWT;
