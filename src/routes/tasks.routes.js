import { Router } from "express";
import {
  getTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controller/tasks.controller.js";

const router = Router();

router.get("/get", getTasks);

router.get("/get/:id", getOneTask);

router.post("/add", createTask);

router.patch("/update/:id", updateTask);

router.delete("/delete/:id", deleteTask);

export default router;
