import Login from './Login.jsx';
import Logged from './Logged.jsx'
import Register from './RegisterUser/Register.jsx'
import NotFound from './NotFound.jsx'

export const route=[
    { path:'/Login', component:Login},
    { path:'/Chat', component:Logged},
    { path:'/Register',component:Register},
    { path:'*',component:NotFound}
]