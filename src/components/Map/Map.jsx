import React from 'react';
import GoogleMapReact from 'google-map-react';
import { paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlineIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab';
import useStyles from './MapStyles';

const Map = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width:600px)');
  const coordinates = { lat: 0, lng: 0 };

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBt_W4pZrcbqk8TXQio7o6MN1OWzNg6Q-E' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={''}
        onchange={''}
        onChildClick={''}
      ></GoogleMapReact>
    </div>
  );
};
export default Map;
