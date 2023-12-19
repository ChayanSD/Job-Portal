import {Job} from "../models/jobs.models.js";

export const createJobController =async (req,res,next)=>{
    const {company , position} = req.body;
    if (!company || !company){
        next('please provide all fields');
    }

    req.body.createBy = req.user.userId;
    const job = await Job.create(req.body);
        res.status(201).json({
        job
    });
}

export const getAllJobs = async (req,res,next)=>{
    const jobs = await Job.find({createBy: req.user.userId});
    res.status(200).json({
        totalJobs : jobs.length,
        jobs
    })
}
