const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const medicineSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            min: 3,
            max: 160,
            required: true
        },
        slug: {
            type: String,
            unique: true,
            index: true,
            lowercase: true
        },
        content: {
            type: {},
            required: true,
            min: 20,
            max: 2000000
        },
        user: {
            type: String,
            required: true
        },
        date:{
            type: Date,
            required: true
        },
        stock:{
            type: Number,
            required: true
        },
        price:{
            type:Number,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Medicine', medicineSchema);
