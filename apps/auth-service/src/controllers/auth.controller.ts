import { NextFunction, Request, Response } from "express"
import { validateRegistrationData } from "../utils/auth.helper.js"
import prisma from "../../../../packages/libs/prisma/index.js";

// Register new user
export const userRegistration = async(req: Request, res: Response, next: NextFunction) =>{
    
    validateRegistrationData(req.body, "user");
    const {name, email} = req.body

    const isUserExisting = await prisma.users
}