import express, { Router } from "express";

import {
  getLoggedInUser,
  loginUser,
  refreshToken,
  resetUserPassword,
  userForgotPassword,
  userRegistration,
  verifyUser,
  verifyUserForgotPassword,
} from "../controllers/auth.controller.js";
import isAuthenticated from "@packages/middleware/isAuthenticated.js";

const router: Router = express.Router();
router.post("/user-registration", userRegistration);
router.post("/verify-user", verifyUser);
router.post("refresh-token-user", refreshToken);
router.get("get-logged-in-user", isAuthenticated, getLoggedInUser);
router.post("/login-user", loginUser);
router.post("/forgot-user-password", userForgotPassword);
router.post("/reset-user-password", resetUserPassword);
router.post("/verify-user-forgot-password", verifyUserForgotPassword);

export default router;
