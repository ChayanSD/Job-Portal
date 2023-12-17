import express from "express";
import {loginController, registerController} from "../controllers/authController.js";

const router = express.Router();
router.route('/register').post(registerController);
router.route('/login').post(loginController);
export default router;