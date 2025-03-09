import userModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  const userExist = await userModel.findOne({ email: email });

  if (userExist) {
    return { data: "User already exists", statuscode: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new userModel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await user.save();

  const jwtResponse = generateJWT({ firstName, lastName, email });

  if (jwtResponse.statuscode !== 200) {
    return { data: jwtResponse.data, statuscode: jwtResponse.statuscode };
  }

  return { data: jwtResponse.data, statuscode: jwtResponse.statuscode };
};

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  const userExist = await userModel.findOne({ email: email });

  if (!userExist) {
    return { data: "Incorrect email or password!", statuscode: 400 };
  }

  const passwordMatch = await bcrypt.compare(password, userExist.password);
  if (!passwordMatch) {
    return { data: "Incorrect email or password!", statuscode: 400 };
  }

  const jwtResponse = generateJWT({
    email,
    firstName: userExist.firstName,
    lastName: userExist.lastName,
  });

  if (jwtResponse.statuscode !== 200) {
    return { data: jwtResponse.data, statuscode: jwtResponse.statuscode };
  }

  return { data: jwtResponse.data, statuscode: jwtResponse.statuscode };
};

const generateJWT = (data: any) => {
  const JWTSecret = process.env.JWT_SECRET;
  if (!JWTSecret) {
    return {
      data: "JWT secret is missing. Please try again later.",
      statuscode: 500,
    };
  }

  try {
    const token = jwt.sign(data, JWTSecret, { expiresIn: "24h" });
    return { data: token, statuscode: 200 };
  } catch (error) {
    return {
      data: "Failed to generate JWT. Please try again later.",
      statuscode: 500,
    };
  }
};
