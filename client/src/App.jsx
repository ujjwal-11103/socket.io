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
    })

    //ye socket (ek client ) open hai agr server se koi emit aata hai jiska id1 hai to ye receive krlega
    socket.on('id1', (mess) => {
      console.log(mess);
    })

    socket.on('message', (mess) => {
      console.log(mess);
    })


    return () => {
      socket.disconnect();
    }

  }, [])


  const [message, setMessage] = useState("")

  const formHandler = (e) => {
    e.preventDefault();
    socket.emit("message", message)
    setMessage("")
  }


  return (

    <div style={{ textAlign: 'center' }}>
      <div>
        <div>Chat</div>


        <form onSubmit={formHandler}>
          <div >
            <input type="text" placeholder="Type your message here" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button type='submit'>Send</button>
          </div>
        </form>

      </div>
    </div >
  )
}

export default App
