const mongoose =require('mongoose');
const {Schema} =require('mongoose');

const Users=new Schema({
    username:String,
    password:String,
    name:String,
})

module.exports= mongoose.model('Users',Users,'Users');