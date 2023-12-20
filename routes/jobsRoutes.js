import express, {Router} from "express";
import {
    createJobController,
    deleteJobs,
    getAllJobs,
    jobStatsController,
    updateJobs
} from "../controllers/jobsController.js";
import userAuth from "../middlewares/authMiddlewares.js";

const router = Router();

router.route('/create-job').post(userAuth,createJobController);

//GET JOBS

router.route('/get-job').get(userAuth,getAllJobs);

//Update jobs || patch

router.route('/update-job/:id').patch(userAuth,updateJobs);

//Delete jobs
router.route('/delete-job/:id').delete(userAuth,deleteJobs);

//Jobs stats
router.route('/jobs-stats').get(userAuth,jobStatsController);

export default router;