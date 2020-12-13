import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import React from 'react';

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // this is just an example. Markers are fetched from BestLivings
      nyc: this.props.mapInfo,
      showingInfoWindow: false,  // Hides or shows the InfoWindow
      activeMarker: {},          // Shows the active marker upon click
      selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
    }
    this.displayMarkers = this.displayMarkers.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClose = this.onClose.bind(this);
    //console.log(this.state.nyc);
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

  displayMarkers (props){

    // additional icons: https://sites.google.com/site/gmapsdevelopment/
    console.log(this.state.nyc);
    return this.state.nyc.map((info, index) => {
      return (<Marker key={index} id={index} position={{
        // TODO: add additional properties
        lat: info.latitude,
        lng: info.longitude
     }}
      onClick = {this.onMarkerClick}
      name = {info.imdb_link}
      subText = {info.film}
      options = {{icon: {url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"}}}
      />);
    })
  }

  render() {
    const mapStyles = {
	  	width: '100%',
	  	height: '110%'
		};
    return (
        <div class="googleMapContainer">

          <Map
            google={this.props.google}
            zoom={10}
            style={mapStyles}
            initialCenter={{ lat: 40.7128, lng: -74.0060}}  //center of nyc
          >
              {this.displayMarkers}

              <Marker key={1} id={1} position={{
                // TODO: add additional properties
                lat: 40.7128,
                lng: -74.0060
             }}
              onClick = {this.onMarkerClick}
              name = {"link"}
              subText = {"film name"}
              options = {{icon: {url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"}}}
              />


              <Marker key={2} id={2} position={{
                // TODO: add additional properties
                lat: 40.8128,
                lng: -74.1060
             }}
              onClick = {this.onMarkerClick}
              name = {"link2"}
              subText = {"film name2"}
              options = {{icon: {url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"}}}
              />

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
        </div>
    );
  }
}

export default GoogleApiWrapper({
  // This is important! Do not leak it!
  apiKey: 'AIzaSyA0rycsA7bNG_uKcvXq7i5wIcYmOIalCQs'
})(MapContainer);
