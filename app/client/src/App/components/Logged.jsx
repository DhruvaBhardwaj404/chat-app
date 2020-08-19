import React, { Component } from 'react'
import ChatBox from './ChatBoxFunc/ChatBox.jsx'
import ActiveUsers from './ActiveUsersFunc/ActiveUsers.jsx'
import {connect} from 'react-redux'
import {socket} from './SocketCon.js'
import {Redirect, useHistory} from 'react-router-dom'

function Logged(props){
    let history = useHistory();
    if(props.username){
    socket.emit('SET',{username:props.username,message:'connected'});
        return (
            <React.Fragment>
                <div className='container-fluid bg-dark '>
                <div className='row p-3'>
                <div className='col-8'>
                <ChatBox socket={socket}/>
                </div>
                <div className='col-4'>
                <ActiveUsers socket={socket}/>
                </div>
                </div>
                </div>
            </React.Fragment>
        )
        }
        else{
            return (
                <div style={{height:"70vh"}} className='container-fluid justify-content-center bg-secondary shadow  p-3'>
                  {setTimeout(()=>{
                      history.push('/Login')
                  },3000)}
                  <div style={{marginTop:"170px"}} className="alert alert-danger  display-4 p-5">
                       <center>
                       Not Logged In!   
                       </center>
                  </div>
                  
                </div>    
            )
        }
}

const mapStateToProps=(state)=>{
 return{
     username:state.data.username,
 }
}


export default connect(mapStateToProps)(Logged)
