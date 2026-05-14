import { Router } from "express";
const router = Router();
import * as controller from "../controllers/authController.js";

router.post("/register", controller.register);
router.post("/login", controller.login);

router.get('/refresh-token', controller.refreshToken)

export default router;
