import express from "express";

import { register, login } from "../controllers/auth.controller.js";

import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";

const router = express.Router();

// Register
router.post("/register", registerValidator, register);

// Login
router.post("/login", loginValidator, login);

export default router;