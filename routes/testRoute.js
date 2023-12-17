import express,{Router}from "express";
import {testController} from "../controllers/testController.js";
import authMiddlewares from "../middlewares/authMiddlewares.js";


const router = Router();

router.route('/test-post').post(authMiddlewares,testController);
export default router;