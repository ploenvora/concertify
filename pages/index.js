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

    return (
      <Fragment>
        <h1>Home Page</h1>
        <SideBar />
        <Location/>
        <TopArtists onArtistNames={handleArtistNames}/>
        <Concerts artistNames={artistNames}/>
      </Fragment>
    );
  }
  
  export default Home;