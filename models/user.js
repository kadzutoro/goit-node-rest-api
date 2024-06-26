
import { boolean } from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
    verify: {
      type: boolean,
      default: false,
    },
    verificationToken: {
      type: string,
      required:[true, 'Verify token is required'],
    },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", userSchema);

export default User;