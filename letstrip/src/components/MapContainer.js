import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'   
}

const containerStyle = {
  position: 'unset',  
  width: '100%',
  height: '500px'
}

class MapContainer extends React.Component {

  constructor(props) {
    super(props)
    const lat = props.lat
    const lng = props.lng
    this.state = {
      marker: {
        title: '',
        name: '',
        position: {
          lat,
          lng          
        }
      }
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick(mapProps, map, clickEvent) {
    const { latLng } = clickEvent
    const lat = latLng.lat()
    const lng = latLng.lng()
    this.setState({
      marker: {
        title: 'titre',
        name: 'name',
        position: { lat, lng }
      }
    })
    this.props.onChangeLocation(lat, lng)    
  }

  render() {    
    let markerMap;
    if(this.state.marker != false){
      markerMap = <Marker title={this.state.marker.title} name={this.state.marker.name} position={this.state.marker.position}  />
    }

    return (
      <Map google={this.props.google} zoom={8} containerStyle={containerStyle} style={mapStyles} onClick={this.onClick}>
        {markerMap}
      </Map>
    );
  };
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDNSPEPBGcib5s12KumvwB7gKV5Gg5RNSs'
})(MapContainer);