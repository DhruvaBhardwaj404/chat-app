import React,{useState,useEffect} from 'react'
import getActiveUsers from './getActiveUsers.js'
import {connect} from 'react-redux';

function ActiveUsers(props) {
    const [list, setList] = useState([{}]);

    setTimeout(async ()=>{
        const userList=await getActiveUsers(props.username);
       setList(userList);
     },1000); 
        
        return (
            <div style={{height:'65vh',overflow:'auto'}} className='container-fluid bg-secondary p-3 border'>
                <div className="cotainer bg-white rounded-pill p-3">
                    <center>
                        Active Users!!
                    </center>
                </div>
                <br/>
                <table className="table text-dark">
                {list.map((user)=>{     if(user.username!==props.username)
                                           return (
                                            <tbody>
                                           <tr className="container-fluid bg-white">
                                           <td>{user.username}</td>
                                           <td><div className='spinner-grow spinner-grow-sm text-success' /></td>  
                                           </tr>
                                           </tbody>
                                           )
                                         })}
                </table>
            </div>
        )
        
}

const mapStateToProps=(state)=>{
    return {
        username:state.data.username,
    }
}

export default connect(mapStateToProps)(ActiveUsers)