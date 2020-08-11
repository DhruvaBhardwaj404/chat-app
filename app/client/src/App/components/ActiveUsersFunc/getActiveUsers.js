
import axios from 'axios';


async function getActiveUsers(username){
    const query={
        username,
    }

    const result=await axios({
        url:'https://localhost:8000/getActive',
        method:"POST",
        headers:{'Content-Type':'application/json'},
        withCredentials:true,
        data:JSON.stringify({query:query})
    })
    if(result.status=='200'){
        //console.log(result.data);
        return result.data.result;
    }
    else{
        return false;
    }
}





export default getActiveUsers