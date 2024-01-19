const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pan:{
        type:String,
        required:true
    },
    license:{
        type:String,
        required:true,
    },
    user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
    },
    Car:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'car'
    },
    createdAt:{
    type:Date,
    default:Date.now,
    },
});

module.exports = mongoose.model('form', formSchema);