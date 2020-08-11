const mongoose = require('mongoose');
const {Schema} = require('mongoose')

const ActiveUsers= new Schema({
    username:String,
    active:Boolean,
    socketID:String
})

module.exports=mongoose.model('ActiveUsers',ActiveUsers,'ActiveUsers');