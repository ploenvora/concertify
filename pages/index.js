import { Fragment } from 'react';
import { useState } from 'react';
import SideBar from '../components/layout/SideBar';
import TopArtists from '../components/artists/TopArtists';
import Concerts from "../components/concerts/Concerts";
import Location from '../components/layout/Location';

function Home() {
    // retrieving the top artist names
    const [artistNames, setArtistNames] = useState();

    // callback function to receive the list of artist names from the child component
    function handleArtistNames(names) {
      setArtistNames(names)
    }

    // retrieving the city and state
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    // function to set the city name from the child component
    function handleLocation(city, state) {
      console.log(city, state)
      if (city && state) {
        setSelectedCity(city);
        setSelectedState(state)
        setSelectedLocation(`${city}, ${state}`)
      }
    };


    return (
      <Fragment>
        <h1>Home Page</h1>
        <SideBar />
        <Location onLocationChange={handleLocation}/>
        <TopArtists onArtistNames={handleArtistNames}/>
        <Concerts artistNames={artistNames} city={selectedCity} state={selectedState} location={selectedLocation}/>
      </Fragment>
    );
  }
  
  export default Home;