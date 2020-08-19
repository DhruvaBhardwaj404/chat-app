import React, { Component } from 'react'
import DisplayMessage from './DisplayMessage.jsx'
import MessageBox from './MessageBox.jsx'
import {connect} from 'react-redux';
import {chatSetAction} from '../../redux';
import {socket} from '.././SocketCon.js'



function ChatBox(props) {
        socket.on('get_message',data=>{
            props.loadMessage(data);  
        })

            
        return (
            <div style={{height:"65vh"}} className='bg-secondary shadow justify-content-center'>
                <DisplayMessage/>
                <br/>
                <MessageBox/>
            </div>                
        )
        
}

const mapStateToProps= state =>{
    return {
        messages:state.messages,
        username:state.data.username

    } 
    
}

const mapDispatchToProps=dispatch=>{
    return{
        loadMessage:data=>dispatch(chatSetAction(data))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(ChatBox)



