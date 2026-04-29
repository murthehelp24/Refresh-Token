import { Router } from "express";
const router = Router();
import * as controller from "../controllers/todoController.js";
import auth from "../middlewares/authMiddleware.js";

router.use(auth);
router.get("/", controller.getTodos);
router.post("/", controller.createTodo);
router.patch("/:id", controller.updateTodo);
router.delete("/:id", controller.deleteTodo);

export default router;
