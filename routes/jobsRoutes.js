import express, {Router} from "express";
import {createJobController, getAllJobs, updateJobs} from "../controllers/jobsController.js";
import userAuth from "../middlewares/authMiddlewares.js";

const router = Router();

router.route('/create-job').post(userAuth,createJobController);

//GET JOBS

router.route('/get-job').get(userAuth,getAllJobs);

//Update jobs || patch

router.route('/update-job/:id').patch(userAuth,updateJobs);

export default router;