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
    this.displayLink = this.displayLink.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClose = this.onClose.bind(this);
    // console.log(this.state.nyc);
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

  displayLink (link, scene){
    // additional icons: https://sites.google.com/site/gmapsdevelopment/
    return (
      <div class="imdmLink">
        <p>This place is used for a {scene} scene, please <a href = {link}>click here</a> for more: </p>
      </div>
    );

  }

  render() {
    const mapStyles = {
	  	width: '100%',
	  	height: '100%'
		};
    return (
        <div class="googleMapContainer">

          <Map
            google={this.props.google}
            zoom={10}
            style={mapStyles}
            initialCenter={{ lat: 40.7128, lng: -74.0060}}  //center of nyc
          >
              {this.state.nyc.map((info, index) => {
                return (
                  <Marker key={index} id={index} position={{lat: info.latitude, lng: info.longitude}}
                    onClick = {this.onMarkerClick}
                    name = {'Part of "'+info.film + '" is filmed here!'}
                    subText = {this.displayLink(info.imdb_link, info.scene_type)}
                    options = {{icon: {url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"}}}
                  />
                );
              })}


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
