import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlaceData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
  const [places, setPlaces] = useState([]);

  const [filterplaces, setFilterPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [childClick, setChildClick] = useState(null);

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  //give automatic location for map
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  useEffect(() => {
    const Filterplaces = places.filter(place => place.rating > rating);
    setFilterPlaces(Filterplaces);
  }, [rating]);

  useEffect(() => {
    setIsLoading(true);

    getPlaceData(type, bounds.sw, bounds.ne).then(data => {
      setPlaces(data);
      setFilterPlaces([]);
      setIsLoading(false);
    });
  }, [type, coordinates, bounds]);
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={filterplaces.length ? filterplaces : places}
            childClick={childClick}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filterplaces.length ? filterplaces : places}
            setChildClick={setChildClick}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default App;
