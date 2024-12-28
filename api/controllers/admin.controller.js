import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        next(err);
    }
};
