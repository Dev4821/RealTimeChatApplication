const http=require("http");
const express =require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app=express();
const port= process.env.PORT ||4500;


const users=[{}];

app.use(cors());
app.get("/",(req,res)=>{
    res.send(" WORKING");
})

const server=http.createServer(app);

const io=socketIO(server);

io.on("connection",(socket)=>{
    console.log("New Connection");
    var date =new Date();
  var curTime = date.getHours() + ':' + date.getMinutes();

    socket.on('joined',({user})=>{
          users[socket.id]=user;
          let time2=curTime;
          console.log(`${user} has joined `);
          socket.broadcast.emit('userJoined',{user:"Admin",message:` ${users[socket.id]} has joined`,timestamp:`${time2} `,url:"https://firebasestorage.googleapis.com/v0/b/photo-manager-portal.appspot.com/o/PhotoHandler%2Fimages%2F5856.jpg?alt=media&token=75824e50-25a2-4bfa-90fd-4ea5add1144d"});
          socket.emit('welcome',{user:"Admin",message:`Welcome to the chat,${users[socket.id]}`,timestamp:`${time2}`,url:"https://firebasestorage.googleapis.com/v0/b/photo-manager-portal.appspot.com/o/PhotoHandler%2Fimages%2F5856.jpg?alt=media&token=75824e50-25a2-4bfa-90fd-4ea5add1144d" })
    })

    socket.on('message',({message,url,timestamp,id})=>{
        io.emit('sendMessage',{user:users[id],message,url,timestamp,id});
    })

    socket.on('disconnectt',()=>{
        let time2=curTime;
          socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]}  has left`,timestamp:`${time2}` ,url:"https://firebasestorage.googleapis.com/v0/b/photo-manager-portal.appspot.com/o/PhotoHandler%2Fimages%2F5856.jpg?alt=media&token=75824e50-25a2-4bfa-90fd-4ea5add1144d"});
        console.log(`user left`);
    })
});


server.listen(port,()=>{
    console.log(`Working`);
})