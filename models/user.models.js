import mongoose, {Schema} from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: validator.isEmail,
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: "dhaka"
    }


}, {
    timestamps: true
});

//hash the password;
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//compare pass
userSchema.methods.comparePassword = async function (userPassword){
    return await bcrypt.compare(userPassword,this.password);
}

userSchema.methods.createJWT = function () {
    return JWT.sign(
        {userId: this._id},
        process.env.JWT_SECRET,
        {expiresIn: "1d"});
}
export const User = mongoose.model('user', userSchema);