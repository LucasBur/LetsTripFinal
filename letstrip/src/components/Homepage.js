import React from 'react';
import Register from './Forms/Inscription/Register';
import Login from './Forms/Login/Login';
import RoadmapLogin from './Forms/RoadmapLogin/RoadmapLogin'
import Sidebar_Homepage from './Sidebar_Homepage';
import morocco from '../design/video/morocco.mp4'
import '../styles/Homepage_style.css'

const Homepage = () => {
    return (
        <div className='homepage'>
            <video autoPlay loop muted style={{
                position: 'absolute',
                height: '100vh',
                width: '100%',
                objectFit: 'cover',
                zIndex: '-1'
            }}>
                <source src={morocco} type='video/mp4' />
            </video>

            <Sidebar_Homepage />
        </div>
    )
}

export default Homepage;