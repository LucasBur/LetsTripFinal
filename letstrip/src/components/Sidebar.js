import React from 'react';
import auth from '../auth';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import '../styles/Sidebar_styles.css'

class NavBar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <h1>Let's Trip</h1>
            </div>
        );
    }
}

export default NavBar;