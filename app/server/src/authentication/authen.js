const mongoose=require('mongoose');
const Users= require('../models/Users')
const bcrypt = require('bcryptjs')

 async function authen(data){
    //console.log("authen")
    const {username,password}= await data;
    var result;
    
  //  console.log(await Users.exists({username:username}));
    if(await Users.exists({username})){
        result=await Users.findOne({username});
        //console.log(result);
        const exist =await bcrypt.compare(password,result.password)
        // console.log(exist);
         if(exist===true){
                return result;
            }
            else{
                return false;
            }
        
    }
    else{
        return false;
    }
}

module.exports= {authen}