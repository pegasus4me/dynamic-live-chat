const express = require("express")
const cors = require('cors')
const http = require('http')
const { Server } = require("socket.io")
const app = express()
app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
    cors : { // geston errors
        origin: "http://127.0.0.1:5173",
        methods : ["POST", "PUT", "GET"]

    }   
});

io.on("connection", (socket) => {

    // creer un evenement join room
    socket.on("join_room", (data) => {
        let joi = socket.join(data)
        
       let val = []
        if(socket.connected) {
           val.push(...val, data)
           console.log(val)
        } 
        console.log(`${socket.id} joined ${data}`)
    })
    socket.on("send_msg", (data) => {
      
        socket.to(data.room).emit("msg_even", data)

    })

    
 
    socket.on("disconnect", () => {
        console.log('disconnet ========', socket.id)
    })
     
   
})


server.listen(3001, () => {
    console.log('tout est')
})

