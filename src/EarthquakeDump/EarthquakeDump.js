import React from 'react';

const EarthquakeDump = (props)=>{
    const quakes = props.quakesList.map((quake, i)=>{
        const quakeTitle = quake.properties.title.slice(quake.properties.title.indexOf('of') + 2);
        return(
            <div key={i} className="quake-info">
                <p>{quakeTitle}</p>
                <p>Magnitude: {quake.properties.mag}</p>
            </div>
            
        )
    })

    return(
        <div>
            {quakes}
        </div>
            
        
    )
}

export default EarthquakeDump;