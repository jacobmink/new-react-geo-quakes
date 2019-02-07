import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Markers from './Markers'

export class MapContainer extends Component{
    constructor(){
        super();
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        }
    }
    onMarkerClick = (props, marker, e) =>{
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }
    onClose = props =>{
        if(this.state.showingInfoWindow){
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }
    render(){
        const {google} = this.props;
        const markerList = this.props.quakesList.map((quake, i)=>{
            return(
                <Marker key={i} position={{
                    lng: parseFloat(quake.geometry.coordinates[0]),
                    lat: parseFloat(quake.geometry.coordinates[1])
                }} icon={{url: "../../public/images/earthquake.png", anchor: new google.maps.Point(32,32),
                scaledSize: new google.maps.Size(32,32)}} onClick={this.onMarkerClick}/>
            )
            
        })
        return(
            <Map google={this.props.google} containerStyle={{width: '100%', height: '400px', position: 'relative'}} zoom={3} initialCenter={{
                lat: 39.7348,
                lng: -104.9653
            }}>
                {markerList}
                
                <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onClose} >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>

            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg')
})(MapContainer)

// {/* <Markers quakesList={this.props.quakesList} google={this.props}/> */}