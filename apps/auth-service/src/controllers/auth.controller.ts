import { NextFunction, Request, Response } from "express";
import {
  checkOtpRestrictions,
  handleForgotPassword,
  sendOtp,
  trackOtpRequests,
  validateRegistrationData,
  verifyOtp,
} from "../utils/auth.helper.js";
import bcrypt, { compare } from "bcryptjs";
import prisma from "@packages/libs/prisma/index.js";
import { AuthError, ValidationError } from "@packages/error-handler/index.js";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { setCookie } from "../utils/cookies/setCookie.js";

// Register new user
export const userRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    validateRegistrationData(req.body, "user");
    const { name, email } = req.body;

    const isUserExisting = await prisma.users.findUnique({ where: { email } });

    if (isUserExisting) {
      return next(new ValidationError("User already exists with this email"));
    }

    await checkOtpRestrictions(email, next);
    await trackOtpRequests(email, next);
    await sendOtp(name, email, "user-activation-mail");

    res.status(200).json({
      message: "OTP sent to email. Please verify your account.",
    });
  } catch (error) {
    return next(error);
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, otp, password, name } = req.body;
    if (!email || !otp || !password || !name) {
      return next(new ValidationError("All fields are required!"));
    }
    const isUserExisting = await prisma.users.findUnique({ where: { email } });
    if (isUserExisting) {
      return next(new ValidationError("User already exists with this email!"));
    }

    await verifyOtp(email, otp);

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.users.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(200).json({
      message: "User created succefully.",
    });
  } catch (error) {
    return next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ValidationError("Email and password are required!"));
    }
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return next(new AuthError("User doesn't exists!"));
    }

    // verify password
    const isPasswordMatching = await bcrypt.compare(password, user.password!);
    if (!isPasswordMatching) {
      return next(new AuthError("Invalid email or password"));
    }

    const ACCESS_TOKEN_SECRET =
      "a4b18bb47881a21b79aa6449875e2927aa529349928a4bd9d95010b7d09740f1";
    const REFRESH_TOKEN_SECRET =
      "e20258a49e30bc6845f7a6c7cacba98b72be64fffee29effcacd7cfdd652b71b";
    // Generate access and refresh token
    const accessToken = jwt.sign(
      { id: user.id, role: "user" },
      // process.env.ACCESS_TOKEN_SECRET as string,
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      },
    );

    const refreshToken = jwt.sign(
      { id: user.id, role: "user" },
      // process.env.REFRESH_TOKEN_SECRET as string,
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // store the refresh and acccess token in an httpOnly secure cookie

    setCookie(res, "refresh_token", refreshToken);
    setCookie(res, "access_token", accessToken);

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    return next(error);
  }
};

//resresh token user
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      return new ValidationError("Unauthorized! No refresh token.");
    }

    const decode = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as { id: string; role: string };

    if (!decode || !decode.id || !decode.role) {
      return new JsonWebTokenError("Forbidden! Invalid refresh token");
    }

    //let account;
    //if (decode.role ==="user"){}
    const user = await prisma.users.findUnique({ where: { id: decode.id } });

    if (!user) {
      return new AuthError("Forbiden! User/Seller not found");
    }
    const newAccessToken = jwt.sign({
      id: decode.id, role: decode.role
    }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "15m" });

    setCookie(res, "access_token", newAccessToken);
    return res.status(201).json({ success: true });
  } catch (error) {
    return next(error);
  }
}

//get logged in user
export const getLoggedInUser = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user) {
      return next(new ValidationError("Unauthorized! User not found"));
    }
    res.status(201).json({ success: true, user });
  } catch (error) {
    return next(error);
  }
};
export const userForgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await handleForgotPassword(req, res, next, "user");
};

// verify forgot password OTP
export const verifyUserForgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await verifyForgotPasswordOtp(req, res, next);
};
// Reset user password
export const resetUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return next(new ValidationError("Email and new password are required!"));
    }
    const user = await prisma.users.findUnique({ where: { email } });
    // compare new password with existing one
    const isPasswordSame = await bcrypt.compare(newPassword, user?.password!);
    if (isPasswordSame) {
      return next(
        new ValidationError(
          "New password cannot be the same as the old password!",
        ),
      );
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.users.update({
      where: { email },
      data: { password: hashedPassword },
    });
    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    next(error);
  }
};

export const verifyForgotPasswordOtp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      throw new ValidationError("Email and OTP are required!");
    }
    await verifyOtp(email, otp);
    res
      .status(200)
      .json({ message: "OTP verified. You can now rest your password." });
  } catch (error) {
    next(error);
  }
};
