import { NextFunction, Request, Response } from "express"
import { checkOtpRestrictions, sendOtp, trackOtpRequests, validateRegistrationData, verifyOtp } from "../utils/auth.helper.js"
import bcrypt from "bcryptjs";
import prisma from "@packages/libs/prisma/index.js";
import { AuthError, ValidationError } from "@packages/error-handler/index.js";

// Register new user
export const userRegistration = async(req: Request, res: Response, next: NextFunction) =>{
  try {
      
    validateRegistrationData(req.body, "user");
    const {name, email} = req.body

    const isUserExisting = await prisma.users.findUnique({where: {email}});

    if (isUserExisting) {
        return next(new ValidationError("User already exists with this email"));
    };

    await checkOtpRestrictions(email, next);
    await trackOtpRequests(email, next);
    await sendOtp(name, email, "user-activation-mail");

    res.status(200).json({
        message: "OTP sent to email. Please verify your account."
    })


  } catch (error) {
    return next(error);
  }
}

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const {email, otp, password, name} = req.body;
     if (!email || !otp || !password || !name ) {
      return next( new ValidationError("All fields are required!"));
    }
    const isUserExisting = await prisma.users.findUnique({ where: {email}});
      if (isUserExisting) {
        return next(new ValidationError("User already exists with this email!"));
      }

      await verifyOtp(email, otp, next);

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.users.create({
        data:{ name, email, password: hashedPassword },
      });
  } catch (error) {
    return next(error)
    
  }
}

export const loginUser = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const { email, password} = req.body;
    if (!email || password) {
      return next(new ValidationError("Email and password are required!"));
    }
    const user = await prisma.users.findUnique({where: {email}});
    if (!user) {
      return next(new AuthError("User doesn't exists!"));
    }

    // verify password
    const isPasswordMatching = await bcrypt.compare(password, user.password!);
    if (!isPasswordMatching) {
      return next(new AuthError("Invalid email or password"))
    }
  } catch (error) {
    return next(error);
  }
}