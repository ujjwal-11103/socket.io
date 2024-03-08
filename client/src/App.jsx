import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'

const App = () => {
  // yehi code client(browser) ko connect kr rha hai server se 
  //isko memo me isliye dala hai ki ye brbr repet horha tha
  const socket = useMemo(() => io("http://localhost:3000/"), [])

  //Is line se socket object banta hai jo server se communication ke liye use hota hai. Is object ke through aap server ke saath messages exchange kar sakte hain, events listen kar sakte hain, aur events emit kar sakte hain.

  useEffect(() => {

    socket.on('connect', () => {
      console.log("User connected client side");
      console.log(`user id = ${socket.id}`);
      // ye bhi ek event trigger hai jo run hoga when successfully connected
      setUserID(socket.id)
    })

    //ye socket (ek client ) open hai agr server se koi emit aata hai jiska id1 hai to ye receive krlega
    socket.on('id1', (message) => {
      console.log(message);
    })

    socket.on('message', (mess, tempUserIDD) => {
      console.log(mess + `\n from user = ${tempUserIDD}`);

      // for chat history
      setAllMessages((allmessages) => [...allmessages, mess])
    })
    return () => {
      socket.disconnect();
    }

  }, [])


  const [message, setMessage] = useState("")
  const [Room, setRoom] = useState("")
  const [UserID, setUserID] = useState("")
  const [tempUserID, setTempUserID] = useState("")
  const [allmessages, setAllMessages] = useState([])

  console.log(allmessages);

  const formHandler = (e) => {
    e.preventDefault();
    socket.emit("message", { message, Room, tempUserID })  //idhr se same jana chaie or udhr bhi same rehna chaiye or udhr se jab aayega idhr app.js me idhr diff name de ske ho
    setMessage("")
    setRoom("")
  }


  return (

    <div style={{ textAlign: 'center' }}>
      <div>
        <div>Chat</div>
        <h6>{UserID}</h6>


        <form onSubmit={formHandler}>
          <div >

            <input type="text" placeholder="Type your message here" value={message} onChange={(e) => setMessage(e.target.value)} /><br></br>
            <input type="text" placeholder="User Id" value={Room} onChange={(e) => setRoom(e.target.value)} /><br></br>

            <button type='submit' onClick={(e) => setTempUserID(UserID)}>Send</button>
          </div>
        </form>
        <div>
          {
            allmessages.map((m, i) => (
              <div key={i}>{m}</div>
            ))
          }
        </div>
      </div>
    </div >
  )
}

export default App
