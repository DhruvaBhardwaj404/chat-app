import React, { useState } from 'react'
import {socket} from '.././SocketCon.js'
import {connect} from 'react-redux'


function MessageBox(props) {
    const [message,setMessage]= useState('');
    
    const submitHandler=(event)=>{
        event.preventDefault(); 
        const data={
            username:props.username,
            message:message 
         }
         socket.emit('sent_message',data);
         setMessage('');
     }


    return(
        <form onSubmit={submitHandler} className='container-fluid form-group w-100 border p-3'>
            <input type="text" className='form-control'value={message} onChange={e=>{setMessage(e.target.value)}}/>
            <button className='btn-primary' >Send</button>
        </form>
    )
}


const mapStateToProps=(state)=>{
    return{
        username:state.data.username,
    }
   }
   
 export default connect(mapStateToProps)(MessageBox)
   

