import express, { Router } from "express";
import { createUser, readUser, updateUser, deleteUser } from "./controllers/userController";

const router = Router();

router.use(express.json());

router.post("/user", createUser);
router.get("/user/:id", readUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export { router };
