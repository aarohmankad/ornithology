import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

export const MapContainer = withScriptjs(withGoogleMap((props) =>

    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 33.9806, lng: -117.3755 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: 33.9806, lng: -117.3755 }} />}

        {props.isMarkerShown && <Marker position={{ lat: 34.0556, lng: -117.1825 }} />}
        {props.tweets.map( (tweet, index) => <Marker key={index} position={{lat: parseFloat(tweet['coordinates'][0]), lng: parseFloat(tweet['coordinates'][1]) }} />)}

    </GoogleMap>
))


// export default MapContainer;