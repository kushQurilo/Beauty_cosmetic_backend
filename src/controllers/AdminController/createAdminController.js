const userModel = require("../../models/userModel");

//singup admin

exports.adminSignup = async (req, res, next) => {
    try {
        const { name, email, phone, passowrd } = req.body;
        if (!name || !email || !phone || !passowrd) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const payload = {
            name,
            email,
            phone,
            passowrd
        }
        const insterAdmin = await userModel.create(payload);
        if (!insterAdmin) {
            return res.status(400).json({ message: "failed to signup" });
        }
        return res.status(200).json({ message: "admin signup success" });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.pendingProfiles = async (req, res, next) => {
    try {
        const users = await userModel.find({ status: "pending" });
        if (!users) {
            return res.status(400).json({ message: "No pending profiles found", success: false });
        }
        return res.status(200)
            .json({ success: true, data: users });
    } catch (err) {
        return res.status(500)
            .json({ success: false, message: err.message });
    }
}