import express,{Router}from "express";
import {testController} from "../controllers/testController.js";
import userAuth from "../middlewares/authMiddlewares.js";


const router = Router();

router.route('/test-post').post(userAuth,testController);
export default router;