import mongoose, { Schema, Types } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;