import { Router } from "express";
const router = Router();
import * as controller from "../controllers/authController.js";

router.post("/register", controller.register);
router.post("/login", controller.login);

export default router;
