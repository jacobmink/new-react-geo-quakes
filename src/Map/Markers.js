import React from 'react';
import { Marker } from 'google-maps-react';

const Markers = (props)=>{
    const {google} = props
    const markerList = props.quakesList.map((quake, i)=>{
        return(
            <Marker key={i} position={{
                lng: parseFloat(quake.geometry.coordinates[0]),
                lat: parseFloat(quake.geometry.coordinates[1])
            }} icon={{url: "../../public/images/earthquake.png", anchor: new google.maps.Point(32,32),
            scaledSize: new google.maps.Size(32,32)}} onClick={this.onMarkerClick}/>
        )
        
    })
    console.log(markerList);

    return(
        <div>
            {markerList}
        </div>
        
    )
}

export default Markers;