import express, { Router } from "express";

import {
    loginUser,
    refreshToken,
    resetUserPassword,
    userForgotPassword,
    userRegistration,
    verifyUser,
    verifyUserForgotPassword,
} from "../controllers/auth.controller.js";

const router: Router = express.Router();
router.post("/user-registration", userRegistration);
router.post("/verify-user", verifyUser);
router.post("refresh-token-user", refreshToken);
router.post("/login-user", loginUser);
router.post("/forgot-user-password", userForgotPassword);
router.post("/reset-user-password", resetUserPassword);
router.post("/verify-user-forgot-password", verifyUserForgotPassword);

export default router;
