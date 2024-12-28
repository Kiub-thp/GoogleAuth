import express from "express";
import { getAllUsers, deleteUser } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

export default router;