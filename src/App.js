import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom'
import Home from './Pages/Home'
import Survey from './Pages/Survey'
import Itinerary from './Pages/Itinerary'
import Maps from './Pages/Maps'
import Navbar from './Pages/Navbar'
import Login from './Pages/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <Login /> 
      <Routes>
        <Route exact path = '/' element = {<Home />} />
        <Route path='/Home' element={<Home/>} />
        <Route path='/Survey' element={<Survey/>} />
        <Route path='/Itinerary' element={<Itinerary/>} />
        <Route path='/Maps' element={<Maps/>} />

      </Routes>
    </Router>
    
  );
}

export default App;
