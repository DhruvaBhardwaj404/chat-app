const mongoose = require('mongoose');
const Active = require('../models/Active.js');
const Users = require('../models/Users.js');
const bcrypt=require('bcryptjs')

async function setUser(username,socketID){
 
  try{
    if(await Active.exists({username})){
      const res = await Active.updateOne({username},{$set:{active:true,socketID}})
      //console.log(res);
      return true; 
    }

    else{
      await Active.create({username,active:true,socketID})
      return true;
    }
   }
  catch(err){
      console.log(err);
      return false;
  } 
}

async function disUser(username){
  
  try{
       if(await Active.exists({username})){
           await Active.updateOne({username},{$set:{active:false,socketID:''}}) 
   }
  }
   catch(err){
      console.log(err);
      return false;
   }

}

async function getActive(username){
   try{
     const exist=await Users.exists({username})
     // console.log(await exist);
     const userData=await Users.findOne({username});
     //console.log(await userData);
     const friend=await userData.friends;
     //console.log(await friend);
     const listOfActive= await Active.find({active:true});
     //console.log(await listOfActive);
     return listOfActive;
    }
    catch(err){
      console.log('error occurred=> ',err);
      return false;
    }

}

async function newUser(data){
  try{
  if(await Users.exists({username:data.username})){
      return {message:'Username Taken'};
  }    
    const salt= await bcrypt.genSaltSync(10);
    const encryptedPass=await bcrypt.hashSync(data.password,salt);
    data.password=encryptedPass;
    const res= await Users.create(data);
 
     return true
  }
  catch(err){
      console.log(err)
       return false;
  }
}

module.exports={setUser,disUser,getActive,newUser}

