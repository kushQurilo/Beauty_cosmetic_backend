const userModel = require("../../models/userModel");
const { hashPassword, compareHashPassword } = require("../../utitlies/hashyPassword");
const jwt = require('jsonwebtoken');
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
            passowrd: hashPassword(passowrd)
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
exports.adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "email password require" })
        }
        const admin = await userModel.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "invalid email or password" })
        }
        if (admin.lockAccount && admin.lockAccount > Date.now()) {
            const unlockTime = new Date(admin.lockAccount).toLocaleTimeString();
            return res.status(403).json({ message: `account locked until ${unlockTime}` })
        }
        const passMatch = await compareHashPassword(admin.password, password);
        if (!passMatch) {
            admin.failedAttempts = (admin.failedAttempts || 0) + 1;
            if (admin.failedAttempts >= 3) {
                admin.lockAccount = new Date(Date.now() + 3 * 60 * 1000)
                await admin.save();
                return res.status(403).json({ message: "account locked due to 3 failed attempts. try again in 3 minutes" })
            }
            await admin.save();
            return res.status(401).json({ message: "invalid password" })
        }
        admin.failedAttempts = 0
        admin.lockAccount = null
        await admin.save();

        const paylod = {
            id: admin._id,
            role: admin._role
        }
        const token = jwt.sign(paylod, process.env.secretKey, { expiresIn: "7d" });
        return res.status(200).json({ message: "login success", token, success: true });
    } catch (error) {
        return res.status(500).json({ message: "something went wrong", status: false });
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

// get single user details

exports.getSingleUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404)
                .json({ message: "invalid user credientials", success: false });
        }
        const userProfie = await userModel.findById(id);
        if (!userProfie) {
            return res.status(404)
                .json({
                    message: "user not found try again",
                    success: false
                })
        }
        return res.status(200)
            .json({ success: true, data: userProfie })
    } catch (err) {
        return res.status(500).json({ message: "something went wrong", success: false });
    }
}


// get all users details 
exports.getAllUserProfiles = async (req, res, next) => {
    try {
        const { id } = req;
        if (!id) {
            return res.status(404)
                .json({ message: "invalid admin credientials", success: false });
        }
        const users = await userModel.find({});
        if (!users) {
            return res.status(404)
                .json({ message: "No user profiles found", success: false });
        }
        return res.status(200)
            .json({ success: true, data: users })

    } catch (err) {
        return res.status(500).json({ message: "something went wrong", success: false });
    }
}


//approve user
exports.approveUser = async (req, res, next) => {
    try{
        const { adminid } = req;
    const { id } = req.params;
    const {status} = req.body;
    const isAdmin = await adminModel.findById(adminid);
    if (!isAdmin) {
        return res.status(404)
            .json({ message: "Invalid admin", success: false });
    }
    if(!status){
        return res.status(404)
        .json({ message: "status is required", success: false });
    }
    const user = await userModel.findById(id);
    if (!user) {
        return res.status(404)
            .json({ message: "User not found", success: false });
    }
    await user.updateOne({status:status});
    user.save()

    }
    catch(err){
        return res.status(500).json({ message: "something went wrong", success: false });
        }
}