import {User} from "../models/user.models.js";


export const registerController = async (req, res, next) => {

    const {name, email, password} = req.body;
    //validation
    if (!name) {
        next('please provide name')
    }

    if (!email) {
        next("please provide email");
    }

    if (!password) {
        next("please provide password")
    }


    const existedUser = await User.findOne({email});

    if (existedUser) {
        next('email already registered please login')
    }

    const user = await User.create({name, email, password});
    const token = user.createJWT();
    return res.status(201).send({
        success: true,
        message: "User created successfully",
        user : {
            name : user.name,
            lastName : user.lastName,
            email : user.email,
            location: user.location
        },
        token
    })

}

export const loginController = async (req,res,next)=>{
    const {email,password} = req.body;
    if (!email || !password){
        next('Please provide all fields');
    }

    const user = await User.findOne({email}).select("+password");
    if (!user) {
        return next('Invalid email or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch){
        next('Invalid email or password');
    }
    user.password = undefined;
    const token = user.createJWT();
    res.status(200).json({
        success:true,
        message : "Login successfully",
        user,
        token
    })
}