import React, { Component } from 'react'
import ChatBox from './ChatBoxFunc/ChatBox.jsx'
import ActiveUsers from './ActiveUsersFunc/ActiveUsers.jsx'
import {connect} from 'react-redux'
import {socket} from './SocketCon.js'


function Logged(props){
    
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

const mapStateToProps=(state)=>{
 return{
     username:state.data.username,
 }
}


export default connect(mapStateToProps)(Logged)
