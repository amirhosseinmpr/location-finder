import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlineIcon from '@material-ui/icons/LocationOnOutlined';

import Paper from '@mui/material/Paper';
import useStyles from './styles';
import Rating from '@mui/material/Rating';

import mapStyles from './mapStyles';

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClick,
}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBt_W4pZrcbqk8TXQio7o6MN1OWzNg6Q-E' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChildClick={child => setChildClick(child)}
        onChange={e => {
          setCoordinates = { lat: e.center.lat, lng: e.center.lng };
          setBounds = { ne: e.marginBounds.ne, sw: e.marginBounds.sw };
        }}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!isDesktop ? (
              <LocationOnOutlineIcon color='primary' fontSize='large' />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.Typography}
                  variant='subtitle2'
                  gutterBottom
                >
                  {place.name}
                  <img
                    className={classes.pointer}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : 'https://www.neo-heidelberg.de/wp-content/uploads/L1170568.jpg'
                    }
                    alt={place.name}
                  />
                </Typography>
                <Rating size='small' value={Number(place.rating)} readonly />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};
export default Map;
