import React from 'react';
import { useState, useEffect } from 'react';
import { BsFillSendFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import "./app.css"
const Chat = ({socket, username, room }) => {

    const [chat, setChat] = useState("")
    const [datas, setDatas] = useState([])
    
    const chatData = async() => {
        
        if(username !== "") {
                let data = {
                    id: socket.id,
                    chat  :  chat,
                    username : username, 
                    room : room,
                    date : new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() 
                }
            await socket.emit("send_msg", data)
            setDatas((l)  => [...l, data])
            let string = JSON.stringify(datas)
            window.localStorage.setItem("value" , string)
        }

        
       
    }
    console.log(socket.connected)
  
   
    useEffect(() => {
       
        socket.off("msg_even").on("msg_even", (data) => {
            
            setDatas((l)  => [...l, data])
            console.log("je suis de l'autre cote mais pas du tiens")
        })
    },[socket])
    
// mr-36

    return (
        
        <div className='border border-gray-200 rounded-sm shadow-lg p-4'>
            <button ><MdLogout/></button>
            <div className=" text-indigo-950 text-lg font-medium text-center">
                <h2>live chat </h2>
            </div>
            <div className='border mb-4 mt-4' >
                {datas.map((message) => {
                    // gerer avec le id changer de couleur et la position par apport a ça
                    return <div className='m-1' id={username === message.username ? "you" : "him"}>
                        <p className='text-md mb-1'>{message.username}:</p>
                        <div className=' border bg-gray-50  p-2 rounded-sm' id={username === message.username ? "he" : "ha"}><p className='text-lg'>{message.chat}</p></div>
                        <p className='text-xs text-zinc-500'>{message.date}</p>
                    </div>
                })}
            </div>
                <div className='flex  '>
                    <input type="text" 
                        placeholder='...'
                        className='border focus:outline-none rounded-sm p-1 w-full'
                        onChange={(e)=> {
                            setChat(e.currentTarget.value)
                        }}
                    />
                    <button onClick={chatData} className='bg-indigo-700 p-1 ml-1 rounded-sm text-white w-7'><BsFillSendFill/></button>    
                </div>
            
        </div>
    );
}

export default Chat;
