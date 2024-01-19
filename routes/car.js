const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  imageText:{
    type:String,
    required: true,
  },
  image:{
    type:String
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  createdAt:{
    type:Date,
    default:Date.now,
  },
});

module.exports = mongoose.model('car', carSchema);