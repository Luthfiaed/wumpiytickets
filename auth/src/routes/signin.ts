import express, { type Request, type Response } from "express";
import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@wumpiytickets/common";
import { User } from "../models/user";
import { PasswordManager } from "../services/password-manager";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password must be supplied"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid Login Credentials");
    }

    const isPasswordMatch = await PasswordManager.compare(
      existingUser.password,
      password
    );
    if (!isPasswordMatch) {
      throw new BadRequestError("Invalid Login Credentials");
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJwt };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
