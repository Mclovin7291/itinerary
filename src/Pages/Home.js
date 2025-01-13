import React from 'react'
import './Styles/Home.css'
import {useNavigate} from 'react-router-dom'
import bg from './Images/background.jpg'
import raff from './Images/raff.png'

export default function Home() {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/Survey')
    }

    return (
        <div className="home-container">
            <img src={bg} className="bg" alt="background" />
            <main>
                <div className="box">
                    <h1 className="typed">Welcome to Raff's Safari</h1>
                    <img src={raff} className="raff" alt="Raff mascot" />
                    <h2>Hi! I'm Raff and I am here to assist you in your travels!</h2>
                    <button className="button" onClick={handleClick}>Get Started</button>
                </div>
            </main>
        </div>
    )
}