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
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Login />
            <Home />
          </>
        } />
        <Route path="/Home" element={
          <>
            <Navbar />
            <Login />
            <Home />
          </>
        } />
        <Route path="/Survey" element={
          <>
            <Navbar />
            <Login />
            <Survey />
          </>
        } />
        <Route path="/Itinerary" element={
          <>
            <Navbar />
            <Login />
            <Itinerary />
          </>
        } />
        <Route path="/Maps" element={<Maps />} />
      </Routes>
    </Router>
  );
}

export default App;
