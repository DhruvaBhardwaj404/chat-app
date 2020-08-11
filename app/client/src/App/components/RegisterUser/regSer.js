import axios from 'axios'

async function regSer(query) {

    const result= await axios({
        url:"https://localhost:8000/reg",
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        data:JSON.stringify({query})
    })

     if(await result.data.message==='Registered'){
         return result.data.message;
     }
     else {
        console.log(result.data) 
        return await result.data.message;
     }
}

export default regSer;
