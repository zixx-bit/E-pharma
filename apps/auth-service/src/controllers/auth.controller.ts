import { NextFunction, Request, Response } from "express"
import { checkOtpRestrictions, sendOtp, trackOtpRequests, validateRegistrationData } from "../utils/auth.helper.js"
import prisma from "../../../../packages/libs/prisma/index.js";
import { ValidationError } from "../../../../packages/error-handler/index.js";

// Register new user
export const userRegistration = async(req: Request, res: Response, next: NextFunction) =>{
  try {
      
    validateRegistrationData(req.body, "user");
    const {name, email} = req.body

    const isUserExisting = await prismadb.users.findUnique({where: email});

    if (isUserExisting) {
        return next(new ValidationError("User already exists with this email"));
    };

    await checkOtpRestrictions(email, next);
    await trackOtpRequests(email, next);
    await sendOtp(email, name, "user-actiavtion-mail");

    res.status(200).json({
        message: "OTP sent to email. Please verify your account."
    })


  } catch (error) {
    return next(error);
  }
}