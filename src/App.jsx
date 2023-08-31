import React from 'react'
import "./global.scss"
import Navbar from "./components/navbar/Navbar"
import Main from "./components/main/Main"

const App = () => {
  return (
    <div className="app">
      <Navbar/>
      <Main/>
    </div>
    
  )
}

export default App
