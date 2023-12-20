import {Job} from "../models/jobs.models.js";
import mongoose from "mongoose";
import moment from "moment";

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

//Jobs stats and filters
export const jobStatsController = async (req, res, next) => {
    //use mongodb aggregation pipeline
    //search jobs
    const stats = await Job.aggregate([
        {
            $match: {
                createBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group: {
                _id: "$status",
                count: {$sum: 1}
            }
        },
    ]);

    //default stats:
    let defaultStats = {
        pending: stats.pending || 0,
        reject: stats.reject || 0,
        interview: stats.interview || 0,
    }

    let monthlyApplication = await Job.aggregate([
        {
            $match: {
                createBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group: {
                _id: {
                    year: {$year: "$createAt"},
                    month: {$month: "$createAt"}
                },
                count: {
                    $sum: 1
                }
            }
        }
    ]);
    monthlyApplication = monthlyApplication.map(item => {
        const { _id: { year, month }, count } = item;
        // Note: months in moment are 0-indexed, so subtract 1 from the month
        let date = moment().set({ year, month: month - 1 }).format("MMM YYYY");
        return { date, count };
    }).reverse();

 return res.status(200).json({
        totalJobs: stats.length,
        defaultStats,
        monthlyApplication

    });
};

