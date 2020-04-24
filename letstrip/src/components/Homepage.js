import React, {useEffect} from 'react';
import SidebarHomepage from './SidebarHomepage';
import introLetsTrip from '../design/video/introLetsTrip.mp4'
import '../styles/Homepage_style.css'

const Homepage = (props) => {
    useEffect(() => {
        if (localStorage.getItem('token')) {
            props.history.push('/dashboard')
        }
    })
    return (
        <div className='homepage'>
            <video autoPlay loop muted style={{
                position: 'absolute',
                height: '100vh',
                width: '100%',
                objectFit: 'cover',
                zIndex: '-1'
            }}>
                <source src={introLetsTrip} type='video/mp4' />
            </video>

            <SidebarHomepage />

        </div>
    )
}

export default Homepage;