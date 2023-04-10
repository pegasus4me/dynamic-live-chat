import { useState, useEffect } from 'react'
import { io } from "socket.io-client"
const socket  = io.connect("http://localhost:3001")
import Chat from './chat'
import './index.css'

function App() {

  const [userName, setUserName] = useState("")
  const [room, setRom] = useState("") 
  const [isOpen, setIsOpen] = useState(false)
  
  const JoinChat = () => {
    if(userName !== "" && room !== "") {
      socket.emit("join_room", room)
      setIsOpen(true)
    }
  }

  return (

    <div className="flex flex-col items-center justify-center mt-20">
     {!isOpen ?(  
        <div className='border  border-gray-50 flex flex-col w-96 p-3 ounded-sm shadow-md'>
          <input type="text"
          placeholder='username'
          className='border border-gray-400 focus:outline-none mb-5 rounded-sm pl-2'
          value={userName} 
          onChange={(e) => {
            setUserName(e.currentTarget.value)
          }}
          />

          <input type="text"
          className='border border-gray-400 focus:outline-none  mb-5 rounded-sm pl-2'
          placeholder='room...'
          value={room} 
          onChange={(e) => {
            setRom(e.currentTarget.value)
          }}
          />

      <button onClick={JoinChat} className='bg-indigo-950 text-white rounded-sm p-1 hover:bg-indigo-500 transition ease-in-out delay-50'>Join chat</button>
      </div> 
      
      ) :( <Chat socket={socket} username={userName} room={room}/>
    )}

    </div>
  )
}

export default App
