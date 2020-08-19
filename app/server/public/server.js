//server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
let app = express();
const https=require('https');
const fs=require('fs');
const mongooose= require('mongoose');
const {setUser,disUser,getActive,newUser} = require('../src/UserQueries/UserQueries.js')
const {authen} =require('../src/authentication/authen');

//============== DB connection================//

const DB=process.env.DB;
try{ 
   mongooose.connect(DB,{useNewUrlParser:true,useUnifiedTopology:true});
    console.log('Connected to Database'); 
}
catch(err){
    console.log('Error occurred while connecting to Database =>',err);
}

//++++++++++++++++++++++++++++++++++++++++++++++//


//=============https server=====================//
const sKey= process.env.KEY;
const port = process.env.PORT || 8000;
const server=https.createServer({
    key:fs.readFileSync('app/server/src/key.pem'),
    cert:fs.readFileSync('app/server/src/cert.pem'),
    passphrase:'A1B2C3D4'
},app)

//+++++++++++++++++++++++++++++++++++++++++++++++//



//===============webpack dev server=========//
const webpack=require('webpack');
const middleware=require('webpack-dev-middleware');
const config=require('./../../../webpack.config');
const compiler=webpack(config);
app.use(middleware(compiler));
//++++++++++++++++++++++++++++++++++++++++++//

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../../build')));


//===============post for auth==================//
app.post('/auth',async (req,res)=>{
    const result=await authen(req.body.query);
    
    if(await result){
       
        //const token=await jwt.sign(JSON.stringify({username:result.username}),sKey);
       // console.log(token);
        result.password='';
        //res.cookie('token',token);
        res.send(JSON.stringify({data:result}));
    }
    else{
        res.send(JSON.stringify({data:'NOT FOUND'}));
    }
})
//++++++++++++++++++++++++++++++++++++++++++++++//


app.post('/getActive',async (req,res)=>{
  //  console.log(req.body);
    const result=await getActive(req.body.query.username);
    res.send(JSON.stringify({result}));
})

app.post('/reg',async (req,res)=>{
    const status= await newUser(req.body.query);
    if(status===true){
      res.send(JSON.stringify({message:'Registered'}));
    } 
    else if(status.message==='Username Taken'){
      res.send(JSON.stringify({message:'Username Taken'}));
    }
    else{
      res.send(JSON.stringify({message:'ServerError'}))
    }
  })

  
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../build', 'index.html'));
  });
  
  
//=========socket.io====================//


const io =require('socket.io').listen(server);
io.on('connection',(socket)=>{
    socket.on('SET',async (data)=>{
        try{   
                await  setUser(data.username,socket.id);
                const checkActiveUser= setInterval(async ()=>{
    
                      if(await(!socket.connected)){
                         disUser(data.username);
                         clearInterval(checkActiveUser);
                      }       
                  },10000)
        }
        catch(err){
            console.log(err);
            socket.disconnect();
        }
      
    })

    socket.on('sent_message',(data)=>{
        try{  
                io.sockets.emit('get_message',data);
               
            }
            catch(err){
                console.log(err);
                socket.disconnect();
            } 
     })
     })
//+++++++++++++++++++++++++++++++++++++++++





server.listen(port,()=>{
    console.log(`server running on ${port}`);
})



/*
app.listen('8000',()=>{
    console.log("server on port 8000");
})
*/


