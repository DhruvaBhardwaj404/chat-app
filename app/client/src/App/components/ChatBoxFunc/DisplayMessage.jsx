require('@babel/polyfill');
import React,{useState,useEffect} from 'react';

import {socket} from '.././SocketCon.js'
import {connect} from 'react-redux'
import { useRef } from 'react';

    

function DisplayMessage(props){ 
     const [count,setCount] = useState(1);
     const scrollPos= useRef(null);
     
    let display= props.messages.map((mess)=>{
                     if(mess.username===props.username){
                         return(
                            <div  style={{float:'right'}} className='bg-primary text-white m-1 w-75 rounded-pill p-3' >
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
   
    const displayMessage=()=>{
        
        return (
            <div>
                {display}
                <div style={{clear:'both'}}ref={scrollPos}></div>
            </div>
        )
    }
    
    useEffect(()=>{
        setInterval(()=>{
            if(props.messages.length!==count){
                setCount(props.messages.length);
                scrollPos.current.scrollIntoView({behavior:"smooth"})
            }
        },1000)
    },[count])

    return (
            <div style={{height:'70%',overflow:'auto',}}  className='container-fluid  bg-secondary border w-100 '>
                {displayMessage()}
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
