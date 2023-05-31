import React from 'react'

const Chat = ({ user, message, img,timestamp, align }) => {
  
  if (user) {

  return (
    <div className="chat-message "   style={{background:"#f2f2f2",borderRadius:"20px",padding:"10px",boxShadow:"5px 5px 2px grey inset",maxWidth:"200px",marginInlineStart:`${align}`,marginBottom:"10px"}}>
      <img src={img} alt="User Avatar" className="avatar" style={{height:"40px" ,width:"40px",margin:"10px" ,borderRadius:"50px"}} />
      <div className="message-details">
      
        <p className="content">{user}: {message}</p>
        <span className="timestamp" >{timestamp}</span>
      </div>
    </div>
  )
}
else
{
  return (
    <div className="chat-message "   style={{background:"#f2f2f2",borderRadius:"20px",padding:"10px",boxShadow:"5px 5px 2px grey inset",maxWidth:"200px",marginInlineStart:`${align}`, marginBottom:"10px"}}>
      <img src={img} alt="User Avatar" className="avatar" style={{height:"40px" ,width:"40px",margin:"10px",borderRadius:"50px"}}/>
      <div className="message-details">
        
       
        <p className="content">You: {message}</p>
        <span className="timestamp">{timestamp}</span>
      </div>
    </div>
  ) 
}
}
export default Chat
