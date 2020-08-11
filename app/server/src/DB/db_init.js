

const userData=[{
    username:"Ghost-404",
    password:"$2a$10$z1J1fnQd1dr22WHbWLGU6ujneNnBzuEzeDwQ2M2bOyfODEGrhTNAW",
    
    name:"Ghost",
    
},
{
    username:"Potato-404",
    password:"$2a$10$z1J1fnQd1dr22WHbWLGU6ujneNnBzuEzeDwQ2M2bOyfODEGrhTNAW",
    name:"Potato",
}
]


const activeData=[{
    username:'Ghost-404',
    active:false,
    socketID:''
    },
    {
    username:'Potato-404',
    active:false,
    socketID:''
    }
]

db.Users.remove({});
db.ActiveUsers.remove({});
db.Users.insert(userData);
db.ActiveUsers.insert(activeData);