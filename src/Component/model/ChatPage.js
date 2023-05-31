import React,{useEffect,useState} from "react";
import Chat from "./Chat";

import socketIo from "socket.io-client";

let socket;
let user;
let url;


const ENDPOINT = "http://localhost:4500/";
const ChatPage = () => {
  const [id, setid] = useState("");
  const [messages, setMessages] = useState([]);
  const [name, setname] = useState("");
  const [click,setclick]= useState(false);
  const[choose, setchoose]=useState(false);
  const[theme,settheme]=useState("light");
  const[swich,setswich]=useState(false);
  var date =new Date();
 

  const send = () => {
    console.log(click);
    const message = document.getElementById('chatInput').value;
    var curTime = date.getHours() + ':' + date.getMinutes();
  

    let timestamp=curTime;
    if(click===true)
    {
    socket.emit('message', { message, url,timestamp,id });
    }
    document.getElementById('chatInput').value = "";
}


  useEffect(() => {
    if(click===true){
    socket = socketIo(ENDPOINT, { transports: ['websocket'] });
   
    socket.on('connect', () => {
       
        setid(socket.id);
        console.log(socket.id);
    }) 
    
    
    

      socket.emit('joined', { user })
    
    

    socket.on('welcome', (data) => {
        setMessages([...messages, data]);
      
        console.log(data.user, data.timestamp, data.message);
    })

    socket.on('userJoined', (data) => {
        setMessages([...messages, data]);
        console.log(data.user, data.timestamp,data.message);
    })

    socket.on('leave', (data) => {
        setMessages([...messages, data]);
        console.log(data.user, data.timestamp,data.message)
    })

    return () => {
      socket.emit('disconnectt');
      socket.off();
  }
}}
// eslint-disable-next-line 
  ,[click])

  useEffect(() => {
    if(click===true )
    {
    socket.on('sendMessage', (data) => {
        setMessages([...messages, data]);
        console.log(data.user, data.message, data.timestamp,data.id );
    })
    return () => {
        socket.off();
    }}
    // eslint-disable-next-line 
}, [messages])
  const sendUser = () => {
    setclick(true);
      user = document.getElementById('joinInput').value;
      
      document.getElementById('joinInput').value = "";
  }
  const handleChoose=(e)=>{
    setchoose(true);
    url=e.target.src;
  }
  const clicker=()=>{
    if(theme==="light")
    {
      settheme("dark");
    }
    else
    {
      settheme("light");
    }
    if(swich===false)
    {
      setswich(true);
    }
    else{
      setswich(false);
    }
    
  }
  return (
      
    <div style={{maxWidth:"400px",align:"center" ,marginTop:"200px" ,marginLeft:"550px"}}>
    <div className="card  col-auto col-xl-300 " style={{maxHeight:"600px" }}>
    { !click && 
      <div className={`card-header  bg-${theme} `}>
          <div class="form-check  form-switch">
          <input class="form-check-input" type="checkbox"  onClick={clicker} role="switch" id="flexSwitchCheckDefault" checked={swich}/>
          <label htmlFor="theme">Theme</label>
          </div>
          <div style={{textAlign:"center"}}>
        <input type="text" id="joinInput" onChange={(e) => setname(e.target.value)}  placeholder="Enter Your Name" style={{background:"#f2f2f2",borderRadius:"10px",padding:"10px",boxShadow:"5px 5px 2px grey inset", marginRight:"10px"}} />
        
        <button className="btn btn-primary "   onClick={sendUser}  style={{borderRadius:"10px",boxShadow:"5px 5px 2px grey"}}  disabled={!name?choose?true:true:!choose ?true:false }  >
          Submit
        </button>
        </div>
       
      </div>}
      { click && 
      <div className={`card-header bg-${theme} `}>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox"  onClick={clicker}  role="switch" id="flexSwitchCheckDefault" checked={swich}/>
          <label htmlFor="theme">Theme</label>
        </div>
       <h4 style={{color:"grey",textAlign:"center"}}>Real Time Chat</h4>
      </div>}

      <div className="card-body " >
        <h5 className="card-title text-center ">Welcome to Real Time Chat</h5>
        { click &&
        <div className="card-text" style={{overflowY:"scroll", maxHeight:"400px"}}>
       
        {messages.map((item, i) => <Chat key={i} user={item.id === id ? '' : item.user} message={item.message} img={item.url} timestamp={item.timestamp}align={item.id === id ? 'auto' : ''} />)}
       
       
        </div>
            }
            { !click &&
            // eslint-disable-next-line  
        <div className="card-text" style={{overflowY:"scroll", maxHeight:"400px"}}>
      
             <h6 style={{textAlign:"center"}}>Choose Your Avatar</h6>
           <img src="https://firebasestorage.googleapis.com/v0/b/photo-manager-portal.appspot.com/o/PhotoHandler%2Fimages%2Favatar1.jpg?alt=media&token=eed67f87-2ce2-40fe-8525-754c35f40a8a"  onClick={handleChoose} alt=" here" style={{height:"80px" ,width:"80px",margin:"10px"}} />
           <img src="https://firebasestorage.googleapis.com/v0/b/photo-manager-portal.appspot.com/o/PhotoHandler%2Fimages%2FAvatar2.jpg?alt=media&token=210746d5-a7dd-451e-a194-3b772093c860"  onClick={handleChoose} alt=" here" style={{height:"80px" ,width:"80px",margin:"10px"}} />
           <img src="https://firebasestorage.googleapis.com/v0/b/photo-manager-portal.appspot.com/o/PhotoHandler%2Fimages%2FAvatar3.jpg?alt=media&token=f845f9ec-a381-41dd-8881-d65a71e27d56"  onClick={handleChoose} alt=" here" style={{height:"80px" ,width:"80px",margin:"10px"}} />
           <img src="https://firebasestorage.googleapis.com/v0/b/photo-manager-portal.appspot.com/o/PhotoHandler%2Fimages%2FAvatar4.jpg?alt=media&token=e25fb7c8-3128-4525-b2c9-6c793a7a847a"  onClick={handleChoose} alt=" here" style={{height:"80px" ,width:"80px",margin:"10px"}} />
           <img src="https://firebasestorage.googleapis.com/v0/b/photo-manager-portal.appspot.com/o/PhotoHandler%2Fimages%2FAvatar5.jpg?alt=media&token=6ed7b24e-617b-4bf7-83e3-39fd12c9880b"  onClick={handleChoose} alt=" here" style={{height:"80px" ,width:"80px",margin:"10px"}} />
           <img src="https://firebasestorage.googleapis.com/v0/b/photo-manager-portal.appspot.com/o/PhotoHandler%2Fimages%2FAvatar6.jpg?alt=media&token=25aa834f-2c8d-4278-a840-4dece7556928"  onClick={handleChoose} alt=" here" style={{height:"80px" ,width:"80px",margin:"10px"}} />

        </div>
            }
      </div>
      { click && 
      <div className={`card-footer d-flex justify-content-center text-body-secondary bg-${theme}`}>
        
        <input className="p-2" type="text" onKeyPress={(event) => event.key === 'Enter' ? send() : null}  id="chatInput" style={{background:"#f2f2f2",borderRadius:"10px",padding:"10px",boxShadow:"5px 5px 2px grey inset", marginRight:"10px",}}  />
        <button className="btn btn-primary  " onClick={send} style={{borderRadius:"10px",boxShadow:"5px 5px 2px grey"}}>
          Send
        </button>
      </div>}
    </div>
    </div>
  );
};

export default ChatPage;
