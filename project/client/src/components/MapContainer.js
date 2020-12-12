import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React from 'react';

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);



    this.state = {
      // this is just an example. At first, no marker should displays on the map
      nyc: [{lat: 40.7128, lng: -74.0060}]
    }
  }

  // TODO: get the coordinates and update "nyc" document array based on some conditions given by users
  getCoordinates(){

  }


  displayMarkers (){
    // need a function to retrive json file from mysql and update "nyc" variable(fetch...)


    return this.state.nyc.map((nyc, index) => {
      return <Marker key={index} id={index} position={{
        // TODO: add additional properties
        lat: nyc.lat,
        lng: nyc.lng
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }

  render() {
    const mapStyles = {
	  	width: '100%',
	  	height: '110%'
		};
    return (
        <Map
          google={this.props.google}
          zoom={10}
          style={mapStyles}
          initialCenter={{ lat: 40.7128, lng: -74.0060}}
        >
          {this.displayMarkers()}
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  // This is important! Do not leak it!
  apiKey: 'AIzaSyA0rycsA7bNG_uKcvXq7i5wIcYmOIalCQs'
})(MapContainer);
