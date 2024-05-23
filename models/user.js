import { required } from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    password: {
        type: string,
        required: [true, 'Password is required']
    },
    email: {
        type: string,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: string,
        enum: ['starter', 'pro', 'business'],
        default: 'starter'
    },
    token: {
        type: String,
        default: null,
    }
}, { timestamps: true, versionKey: false }
)

const User = mongoose.model("User", userSchema);

export default User;