const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone:{
        type:String,
        require:true
    },
    role: {
        type: String,
        default: 'admin'
    }
})

const adminModel = new mongoose.model('Admin', adminSchema);
module.exports = adminModel;