
import axios from 'axios';



axios.defaults.withCredentials=true;

  async function authen(username,password){
    

    const  query={
        username:username,
        password:password,
    }
  
    const result= await axios({
        method:'POST',
        url:'https://localhost:8000/auth',
        headers:{ 'Content-Type':'application/json',
                   'Accept':'application/json'},           
        data:JSON.stringify({query:query})
    }) 
 
    if(result.data.data!='NOT FOUND' && result.status===200){
        //console.log('true');
        return result;
    }
    else{
        return false;
    }

}


export default authen;