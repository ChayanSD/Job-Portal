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

export const updateJobs = async (req,res,next)=>{
    const {id} = req.params;
    const {company,position} = req.body;

    //validation
    if (!company || !position){
        next("Please provide all fields");
    }
    const job = await Job.findOne({_id:id});
    if (!job){
        next(`No jobs found with this ${id}`);
    }

    // if (req.user.userId === job.createBy.toString()){
    //     return;
    //     next('You are not authorize to update the job')
    // }
    const updatedJob = await Job.findOneAndUpdate({_id:id},req.body,{
        new:true,
        runValidators:true
    })

   res.status(200).json({updatedJob});
}

export const deleteJobs = async (req,res,next)=>{
    const {id} = req.params;
    const job = await Job.findOne({_id:id});
    if (!job){
        next(`No jobs find with this ${id}`)
    }
    if (!req.user.userId === job.createBy.toString()){
        next("You are not authorized to delete this post");
        return;
    }

    await job.deleteOne();
    res.status(200).json({
        message : "success ,Job deleted",

    });
}
