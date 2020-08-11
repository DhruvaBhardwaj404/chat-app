import {SET_USER} from './userSetType'
import {SET_CHAT} from './userSetType'

export const userSetAction=(data)=>{
    return {
        type:SET_USER,
        payload:data
    }
}

export const chatSetAction=(data)=>{
    return {
        type:SET_CHAT,
        payload:data
    }
}