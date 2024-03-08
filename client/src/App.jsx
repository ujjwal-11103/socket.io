import React from 'react'
import {io} from 'socket.io-client'

const App = () => {
  const socket = io("http://localhost:3000/")
  return (
    <div>
      <h1>Hello Vite</h1>
    </div>
  )
}

export default App
