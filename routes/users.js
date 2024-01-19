const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
const path = require('path');

mongoose.connect("mongodb://127.0.0.1:27017/CarRent");

const userSchema = mongoose.Schema({
  username: {
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
  },
  fullname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  Car:[{
      type:mongoose.Schema.Types.ObjectId,
      ref: "car",
    }],
  form:[{
      type:mongoose.Schema.Types.ObjectId,
      ref: "form",
    }],
  MyPhoto:{
    type:String
  },
  panPhoto:{
    type:String
  },
  lincesePhoto:{
    type:String
  },
});

userSchema.plugin(plm);

module.exports = mongoose.model('user',userSchema);

