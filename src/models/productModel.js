const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        require: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productPcs: {
        type: Number,
        default: 1
    },
    productDescription: {
        type: String
    },
    productImage: {
        img1: {
            type: String,
            default:"xyz.jpg"
        },
        img2: {
            type: String,
            default:"xyz.jpg"
        },
        img3: {
            type: String,
            default:"xyz.jpg"
        },
        img4: {
            type: String,
            default:"xyz.jpg"
        }
    }
});


const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel;
