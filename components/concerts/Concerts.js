import { useState, useEffect } from "react";
import ConcertCard from "../ui/ConcertCard";
import axios from "axios";
import ngeohash from "ngeohash";

function Concerts(props) {
  const [error, setError] = useState();
  const [concerts, setConcerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locationChange, setLocationChange] = useState("");

  // given the city and state, get the lat long
  async function getLatLong(cityName, stateName) {
    try {
      const response = await axios.get(
        "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json",
      );
      const city = response.data.find(
        (c) =>
          c.city === cityName &&
          c.state === reversedStateAbbreviations[stateName],
      );
      return ngeohash.encode(city.latitude, city.longitude);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  // function that does the fetching
  async function fetchConcertData() {
    setIsLoading(true);
    setError(null);
    try {
      const dataArray = [];
      const geohash = await getLatLong(props.city, props.state);
      for (const artistName of props.artistNames) {
        const response = await fetch(
          `/api/concerts?artist_name=${encodeURIComponent(
            artistName,
          )}&geoPoint=${geohash}&radius=${props.radius}`,
        );
        const data = await response.json();
        dataArray.push(data);
      }
      // filtering data we have seen before
      let combinedData = dataArray.flat();
      let seen = new Map();
      combinedData = combinedData.filter((item) => {
        const valueSeen = seen.get(item.id);
        if (valueSeen) {
          return false;
        }
        seen.set(item.id, true);
        return true;
      });
      // putting the item in local storage so refreshing or exiting out of the page doesnt reload data
      await localStorage.setItem("concerts", JSON.stringify(combinedData));
      await localStorage.setItem("location", props.location);
      await localStorage.setItem("radius", props.radius);
      setConcerts(combinedData);
    } catch (error) {
      console.log(error);
      setError("An error occurred while fetching concert data.");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    // given that the artistNames are loaded in
    if (props.artistNames && props.artistNames.length > 0) {
      const storedConcerts = localStorage.getItem("concerts");
      const storedLocation = localStorage.getItem("location");
      const storedRadius = localStorage.getItem("radius");
      if (
        storedConcerts &&
        storedConcerts != "undefined" &&
        props.location === storedLocation &&
        props.radius === storedRadius
      ) {
        setConcerts(JSON.parse(storedConcerts));
      } else if (props.location.length > 0) {
        localStorage.removeItem("location");
        localStorage.setItem("location", props.location);
        localStorage.removeItem("radius");
        localStorage.setItem("radius", props.radius);
        fetchConcertData();
      }
    }
  }, [props.artistNames, props.location, props.radius]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading &&
        concerts.map((concert) => (
          <ConcertCard key={concert.id} data={concert} />
        ))}
    </div>
  );
}

export default Concerts;

const reversedStateAbbreviations = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};
