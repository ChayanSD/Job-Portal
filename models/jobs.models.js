import mongoose,{Schema} from "mongoose";

const jobSchema = new Schema({

    company : {
        type : String,
        required :[true,'Company name is require']
    },
    position : {
        type : String,
        required : [true,'Job position is require']
    },
    status : {
        type : String,
        enum : ['pending','reject','interview'],
        default : 'pending'
    },
    workType : {
        type : String,
        enum: ['full-time','part-time','internship','contract'],
        default : 'full-time'
    },
    workLocation : {
        type : String,
        default : 'Dhaka',
        required : true
    },
    createBy : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    }

},{timestamps : true})

export const Job = mongoose.model('Job',jobSchema);