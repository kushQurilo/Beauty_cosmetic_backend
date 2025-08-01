const { default: mongoose } = require("mongoose");
const userModel = require("../../models/userModel");

exports.userSignup = async (req, res, next) => {
    try {
        const { name, email, password, address, gstnumber, phone } = req.body;
        if (!name || !email || !password || !address || !gstnumber || !phone) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const payload = { name, email, password, address, gstnumber, phone };
        const user = await userModel.create(payload);
        if (!user) {
            return res.status(400).json({ message: "Faild to signup try again", success: false });
        }
        return res.status(200)
            .json({ message: "singup successfully admin will approve your profile.", success: true });
    } catch (error) {
        return res.status(500)
            .json({ success: false, message: error.message })
    }
}


//get single user

exports.getSingleUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID format' });
        }
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
