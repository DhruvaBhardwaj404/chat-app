import {SET_USER} from './userSetType';
import {SET_CHAT} from './userSetType';

const initial_state={
    logged:false,
    data:{},
    messages:[{username:"Admin",message:"Welcome!! To global chat"}]
}

 const userSetReducer= (state=initial_state,action)=>{
    switch(action.type){
        case SET_USER:{ 
                        return{
                            logged:action.payload.logged,
                            data:action.payload.data,
                            messages:state.messages 
                        }}
        case SET_CHAT:{  state.messages.push(action.payload)
                        return{
                            logged:state.logged,
                            data:state.data,
                            messages:state.messages 
                        }
        }                 
        default : return state
    }
}

export default userSetReducer;