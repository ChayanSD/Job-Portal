import express, {Router} from "express";
import {createJobController, getAllJobs} from "../controllers/jobsController.js";
import userAuth from "../middlewares/authMiddlewares.js";

const router = Router();

router.route('/create-job').post(userAuth,createJobController);

//GET JOBS

router.route('/get-job').get(userAuth,getAllJobs);

export default router;