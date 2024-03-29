import { requireAuth } from './../middlewares/auth.middleware';
import { Router, Request, Response } from "express";
import * as controller from "../controllers/user.controller";
const router: Router = Router();

// const authMiddleware = require("../middlewares/auth.middleware");
router.post("/register",
// validate.registerAccount,
controller.register);

router.post("/login",
// validate.loginAccount,
controller.login);

// router.post("/password/forgot",controller.forgotPassword);

// router.post("/password/otp",controller.otpPassword);

// router.post("/password/reset",controller.resetPassword);

router.get("/detail/:id",
requireAuth,
controller.detail);

router.get("/list",
requireAuth,
controller.list);
export const userRoutes: Router = router;
