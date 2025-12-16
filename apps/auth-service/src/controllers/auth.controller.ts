import { NextFunction, Request, Response } from "express"
import { validateRegistrationData } from "../utils/auth.helper.js"
import prisma from "../../../../packages/libs/prisma/index.js";
import { ValidationError } from "../../../../packages/error-handler/index.js";

// Register new user
export const userRegistration = async(req: Request, res: Response, next: NextFunction) =>{
    
    validateRegistrationData(req.body, "user");
    const {name, email} = req.body

    const isUserExisting = await prismadb.users.findUnique({where: email});

    if (isUserExisting) {
        return next(new ValidationError("User already exists with this email"));
    };

    await checkOtpRestrictions(email, next);


}