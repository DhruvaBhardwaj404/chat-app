import {createStore,applyMiddleware} from 'redux'
import userSetReducer from './userSet/userSetReducer.js';
import logger from 'redux-logger'  



const store = createStore(userSetReducer,applyMiddleware(logger));


export default store;