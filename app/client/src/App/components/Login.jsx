
import React,{useState} from 'react'
import {Redirect} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {connect} from 'react-redux'
import {userSetAction} from '../redux'
import authen from './LoginFunctions/authen.js'



function Login(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ui,setUi]=useState({button:'btn btn-primary',
                               message:'',
                               messagebox:''});


   
    const submitHandler= async(event)=>{
  
        event.preventDefault();
        const res=await authen(username,password);
      
        if(res){
            //console.log(res);
          const payload={
             logged:true,
             data:res.data.data,
            }
            setUi({button:'btn btn-success',message:'Successfully Logged In',messagebox:'alert alert-success'})
            setTimeout(()=>{
                props.SetCred(payload);
            },1000);   
         }

        else{
            setUi({button:'btn btn-danger',message:'Login failed!!!',messagebox:'alert alert-danger'})
        }
    }
    
       // console.log(props.user);


    
        if(!props.user)
        return (
            <div className='container-fluid bg-secondary'>
              <div style={{height:'70vh'}} className='bg-light p-5 container-lg '>
                <br/>
                <center>
                <form  onSubmit={submitHandler} className=' form-group container-sm bg-light border w-50 p-3 shadow '  >
                 
                    <label htmlFor='usr' > Username </label>
                    <input className='form-control'  id='usr' type='text' value={username} onChange={e=>{setUsername(e.target.value)} } /><br/>
                    <label htmlFor='pss'  >Password </label>
                    <input  className='form-control' type="password" id='pss' value={password} onChange={e=>{setPassword(e.target.value)}} /><br/>
                    <button className='form-control' type='submit'  className={ui.button}>Submit</button>
                
                </form>
                 <div className={ui.messagebox}>
                 {ui.message}
                 </div>
                
                </center>
                <center>
               <LinkContainer to='/Register'>
               <button className='btn btn-light shadow'>Register</button>
               </LinkContainer>
               </center>
               
            </div>
            </div>
        )
        else{
            return(
               <Redirect exact from='/Login' to='/Chat'/>
            )
        }
    
}

const mapStateToProps= state =>{
    return {
        user:state.logged,
        userData:state.data
    } 
    
}

const mapDispatchToProps=dispatch=>{
    return{
        SetCred:data=>dispatch(userSetAction(data))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login)



