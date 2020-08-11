require('@babel/polyfill');
import React,{useState,useEffect} from 'react';

import {socket} from '.././SocketCon.js'
import {connect} from 'react-redux'

    

function DisplayMessage(props){ 
     const [count,setCount] = useState(1);
    const display= props.messages.map((mess)=>{
                     if(mess.username===props.username){
                         return(
                            <div  style={{float:'right'}} className='bg-primary text-white m-1 w-75 rounded-pill p-3'>
                                <div className='col'>
                                    <b>{mess.username}</b>
                                    <br/>

                                    {mess.message}
                                 </div>
                            </div>    
                         )
                     }
                     else{
                         return(
                            <div style={{float:'left'}} className='bg-white w-75 m-1 rounded-pill p-3'>
                                <div className='col'>
                                  <b>{mess.username}</b>
                                  <br/>
                                  
                                  {mess.message}
                                 </div>
                          </div>
                         )
                     }
    })
    
    useEffect(()=>{
        setInterval(()=>{
            if(props.messages.length!==count){
                setCount(props.messages.length);
            }
        },1000)
    },[count])

    return (
            <div style={{height:'70%',overflow:'auto',scrollBehavior:'smooth'}} className='container-fluid  bg-secondary border w-100 '>
                {display}
            </div>
           
        ) 
}


const mapStateToProps=(state)=>{
    return{
        messages:state.messages,
        username:state.data.username
    }
}

export default connect(mapStateToProps)(DisplayMessage)
