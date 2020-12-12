import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import React from 'react';

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);



    this.state = {
      // this is just an example. Markers are fetched from BestLivings
      nyc: [{lat: 40.7128, lng: -74.0060}, {lat: 40.7228, lng: -74.0160}, {lat: 40.6128, lng: -74.1060}],
      showingInfoWindow: false,  // Hides or shows the InfoWindow
      activeMarker: {},          // Shows the active marker upon click
      selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
    }
  }

  // TODO: get the coordinates and update "nyc" document array based on some conditions given by users
  getCoordinates(){

  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  displayMarkers (){

    // additional icons: https://sites.google.com/site/gmapsdevelopment/
    return this.state.nyc.map((nyc, index) => {
      return <Marker key={index} id={index} position={{
        // TODO: add additional properties
        lat: nyc.lat,
        lng: nyc.lng
     }}
      onClick={this.onMarkerClick}
      name={'Title'}
      subText = {'Some discriptive text...'}
      options = {{icon: {url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"}}}
      />
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
          initialCenter={{ lat: 40.7128, lng: -74.0060}}  //center of nyc
        >
          {this.displayMarkers()}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
              <p>{this.state.selectedPlace.subText}</p>
            </div>
          </InfoWindow>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  // This is important! Do not leak it!
  apiKey: 'AIzaSyA0rycsA7bNG_uKcvXq7i5wIcYmOIalCQs'
})(MapContainer);
