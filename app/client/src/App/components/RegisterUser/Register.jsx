import React,{useState} from 'react';
import regSer from './regSer.js';
import {useHistory} from 'react-router-dom'

function Register() {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password,setPassword]= useState('');
    const [message,setMessage]=useState((<div> </div>));
    const history = useHistory();
    async function regCon(event){
        event.preventDefault();
        const query={
            username,
            name,
            password,
        }
     var response= await regSer(query);
     if(response==='Registered'){
         setMessage((
         <div className="alert-success w-50">
         <center>
         Registered!
         {setTimeout(()=>{
             history.push('/Login')
         },2000)}
         </center>
         </div>
     ))
     }
     else{
        setMessage((
        <div className="alert-danger w-50">
        <center>
          {response}
        </center>
        </div>
        ))
     }
        
    }
    

    return (
        <div className='container-fluid bg-secondary border shadow p-3 '>
            <div className="container w-75 bg-white border p-5">
          <center>
             <form className='form-group' onSubmit={regCon} >
             <label htmlFor="usrna">Username :</label>
             <input className='form-control w-50' id='usrna' type="text" pattern='.{5,15}' required title='Should be atleast 5 characters long (max 15)' value={username} onChange={e=>setUsername(e.target.value)}/>
             <br/>
             <label htmlFor="">Name :</label>
             <input className='form-control w-50' id='name' type="text" pattern='.{5,20}' required title='Should be atleast 5 characters long (max 15)' value={name} onChange={e=>setName(e.target.value)}/>
             <br/>
             <label htmlFor="pss">Password :</label>
             <input className='form-control w-50' type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
             <br/>
             <button className='form-control w-25 btn-primary'  type='submit'>Submit</button>
            </form>  
         <br/>
         {message} 
         </center>
         </div>
        </div>
    )
}

export default Register;
