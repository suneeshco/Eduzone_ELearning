const io = require("socket.io")(8900,{
    cors:{  
        origin : "http://localhost:5173"
    }
})

let users =[]

const addUser = (userId , socketId)=>{
    !users.some((user)=>user.userId === userId) && 
    users.push({userId,socketId})
}

const removeUser = (socketId)=>{
    users = users.filter(user=>user.socketId !== socketId)
}

const getUser = (userId) =>{
    return users.find(user=>user.userId === userId)
}


io.on("connection",(socket) => {
    console.log("user connected");
    socket.on("addUser",(userId) =>{
        addUser(userId, socket.id)
        io.emit("getUsers",users)
    })
    

    socket.on("sendMessageStudent", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        if (user) {
            io.to(user.socketId).emit("getMessageInstructor", {
                senderId,
                text
            });
        } else {
            console.log(`User with userId ${receiverId} not found.`);
        }
    });

    socket.on("sendMessageInstructor", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        if (user) {
            io.to(user.socketId).emit("getMessageStudent", {
                senderId,
                text
            });
        } else {
            console.log(`User with userId ${receiverId} not found.`);
        }
    });

    socket.on("disconnect", ()=>{
        console.log("a user disconnected");
        removeUser(socket.id)
    })
})