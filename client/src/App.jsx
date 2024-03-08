import React, { useEffect } from 'react'
import { io } from 'socket.io-client'

const App = () => {
  // yehi code client(browser) ko connect kr rha hai server se 

  const socket = io("http://localhost:3000/")

  //Is line se socket object banta hai jo server se communication ke liye use hota hai. Is object ke through aap server ke saath messages exchange kar sakte hain, events listen kar sakte hain, aur events emit kar sakte hain.

  useEffect(() => {

    // ye bhi ek event trigger hai jo run hoga when successfully connected
    socket.on('connect', () => {
      console.log("User connected client side");
      console.log(`user id = ${socket.id}`);
    })

    //ye socket (ek client ) open hai agr server se koi emit aata hai jiska id1 hai to ye receive krlega
    socket.on('id1', (mess) => {
      console.log(mess);
    })

  })



  return (
    <div>
      <h1>Hello Vite</h1>
    </div>
  )
}

export default App
