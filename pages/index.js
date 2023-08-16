import { Fragment } from "react";
import { useState, useEffect } from "react";
import SideBar from "../components/layout/SideBar";
import TopArtists from "../components/artists/TopArtists";
import Concerts from "../components/concerts/Concerts";
import Location from "../components/layout/Location";
import Radius from "../components/concerts/Radius";
import Navigation from "@/components/layout/Navigation";

function Home() {
  // retrieving the top artist names
  const [artistNames, setArtistNames] = useState();

  // callback function to receive the list of artist names from the child component
  function handleArtistNames(names) {
    setArtistNames(names);
  }

  // retrieving the city and state
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // function to set the city name from the child component
  function handleLocation(city, state) {
    if (city && state) {
      setSelectedCity(city);
      setSelectedState(state);
      setSelectedLocation(`${city}, ${state}`);
    }
  }

  // retrieving the radius
  const [selectedRadius, setSelectedRadius] = useState("");

  function handleRadius(radius) {
    if (radius) {
      setSelectedRadius(radius);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#ebebeb] to-[#e6e6e6]">
      <nav className="sticky top-0 z-10 h-[10vh] min-h-[4rem]">
        <Navigation />
      </nav>
      <div className="flex-grow overflow-y-auto">
        <main className="flex min-h-screen">
          <aside className="w-1/4 bg-green-100 sticky top-0 z-10 h-fit">
            <h1>Filter your preferences</h1>
            <Radius onRadiusChange={handleRadius} />
            <Location onLocationChange={handleLocation} />
          </aside>
          <section className="w-full">
            <div className="sticky top-0 z-10">
              <h1>Concerts Recommended For You</h1>
            </div>
            <div>
              <TopArtists onArtistNames={handleArtistNames} />
              <Concerts
                artistNames={artistNames}
                city={selectedCity}
                state={selectedState}
                location={selectedLocation}
                radius={selectedRadius}
              />
            </div>
          </section>
        </main>
        <footer className="bg-white">
          <h1>Footer</h1>
        </footer>
      </div>
    </div>
  );  
}

export default Home;

