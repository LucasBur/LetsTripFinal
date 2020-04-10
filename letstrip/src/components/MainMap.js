import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';

const mapStyles = {
  width: '100%',
  height: '100%'   
}

const containerStyle = {  
  width: '78%',
  height: '90%'
}

class MainMap extends React.Component {

  constructor(props) {
    super(props)   
    this.state = {
      marker: [],
      showingInfowinfow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.onMapClick = this.onMapClick.bind(this)
  }

  onMarkerClick(props, marker, clickEvent) {
    this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    }); 
  }

  onMapClick(props){
    if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
    }
  }

  componentWillMount() {
      axios.get(`http://localhost:4000/GetAllActivitiesForMap/${this.props.roadMapId}`, { headers: { 'Content-Type': 'application/json' }})
      .then(response => {
          if(response.data !== false){
            var markerTab = [];
            response.data.forEach(element => {                
                markerTab.push({
                    title: element.title,
                    name: element.description,
                    day: element.day,
                    startHour: element.startHour,
                    endHour: element.endHour,
                    position: {
                        lat: parseFloat(element.latitude),
                        lng: parseFloat(element.longitude)
                    }
                });
            });
            this.setState({
                marker: markerTab
            })
        }
      });
  }

  render() {
    return (
      <Map google={this.props.google} zoom={8} containerStyle={containerStyle} style={mapStyles} onClick={this.onMapClick}>        
        {this.state.marker.map((element, i) => {            
            return (
                <Marker
                    key={i}
                    title={element.title}
                    name={element.name}
                    day={element.day}
                    startHour={element.startHour}
                    endHour={element.endHour}
                    position={element.position}                    
                    onClick={this.onMarkerClick}  />
            )
        })}
        
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
                <p>{this.state.selectedPlace.title}</p>
                <p>{this.state.selectedPlace.name}</p>
                <p>Jour {this.state.selectedPlace.day}</p>
                <p>De {this.state.selectedPlace.startHour} à {this.state.selectedPlace.endHour}</p>
            </div>
        </InfoWindow>

      </Map>
    );
  };
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDNSPEPBGcib5s12KumvwB7gKV5Gg5RNSs'
})(MainMap);