import React from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button'

class NavBar extends React.Component {
    render() {
        return (         
            <div className="wrapper">                
                <nav id="sidebar">
                    <div class="sidebar-header">
                        <h3>Let's Trip</h3>
                    </div>
                    <ul class="list-unstyled components">
                        <li>
                            <a href="#"><i class="fa fa-map ml-1 mr-1"></i> Mes RoadMaps</a>
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-user-cog ml-1 mr-1"></i> Paramétrer mon compte</a>
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-phone ml-1 mr-1"></i> Contact</a>
                        </li>
                    </ul>
                </nav>

                <div id="content">
                    <button type="button" id="sidebarCollapse" class="navbar-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        );
    }
}

export default NavBar;