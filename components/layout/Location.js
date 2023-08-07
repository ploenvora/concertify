import { useState, useEffect } from 'react';
import axios from 'axios';

function Location({ onLocationChange }) {
  function setDefault() {
    setLocation('New York, NY');
    setSelectedCity('New York');
    setSelectedState('NY');
    onLocationChange('New York', 'NY');
  }

  // Get the initial location from localStorage
  const [location, setLocation] = useState('Loading...');

  useEffect(() => {
    const storedLocation = typeof window !== 'undefined' ? localStorage.getItem('location') : null;
    console.log("stored location from the refresh", storedLocation)
    if (storedLocation) {
      const parts = storedLocation.split(',');
      const cityPart = parts[0].trim();
      const statePart = parts[1].trim();
      onLocationChange(cityPart, statePart);
      setLocation(storedLocation);
    } else {
      getCurrentLocation();
    }
  }, []);

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);

  const getCurrentLocation = async () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        try {
          const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBZabz7FBtxqCOzDS6XrdLc5aWD4PlwbwQ`);
          const cityComponent = response.data.results[0].address_components.find((component) => component.types.includes('locality'));
          const stateComponent = response.data.results[0].address_components.find((component) => component.types.includes('administrative_area_level_1'));
          const city = cityComponent ? cityComponent.long_name : null;
          const state = stateComponent ? stateComponent.short_name : null;
          if (cities.includes(`${city}, ${state}`)) {
            setLocation(`${city}, ${state}`);
            setSelectedCity(city);
            setSelectedState(state);
            onLocationChange(city, state);
          } else {
            setDefault();
          }
        } catch (error) {
          console.error('Error: ', error);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json')
      .then((response) => {
        const uniqueCities = Array.from(new Set(response.data.map((city) => `${city.city}, ${stateAbbreviations[city.state]}`)));
        setCities(uniqueCities);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  }, []);

  const handleCitySelection = (e) => {
    const str = e.target.value;
    const parts = str.split(',');
    const beforeComma = parts[0].trim();
    const afterComma = parts[1].trim();
    setSelectedCity(beforeComma);
    setSelectedState(afterComma);
    setLocation(str);
    onLocationChange(beforeComma, afterComma);
    setEditing(false);
  };

  const handleEditLocation = () => {
    setEditing(true);
  };

  const handleGetCurrentLocation = () => {
    getCurrentLocation();
    setEditing(false);
  };

  return (
    <div className="Location">
      {loading ? (
        <div>Current Location: Loading...</div>
      ) : editing ? (
        <div>
          <select value={selectedCity} onChange={handleCitySelection}>
            <option value="" disabled>Select a city</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <button onClick={handleGetCurrentLocation}>Get Current Location</button>
        </div>
      ) : (
        <div onClick={handleEditLocation}>
          Current Location: {location}
        </div>
      )}
    </div>
  );
}

export default Location;

const stateAbbreviations = {
  'Alabama': 'AL',
  'Alaska': 'AK',
  'Arizona': 'AZ',
  'Arkansas': 'AR',
  'California': 'CA',
  'Colorado': 'CO',
  'Connecticut': 'CT',
  'Delaware': 'DE',
  'Florida': 'FL',
  'Georgia': 'GA',
  'Hawaii': 'HI',
  'Idaho': 'ID',
  'Illinois': 'IL',
  'Indiana': 'IN',
  'Iowa': 'IA',
  'Kansas': 'KS',
  'Kentucky': 'KY',
  'Louisiana': 'LA',
  'Maine': 'ME',
  'Maryland': 'MD',
  'Massachusetts': 'MA',
  'Michigan': 'MI',
  'Minnesota': 'MN',
  'Mississippi': 'MS',
  'Missouri': 'MO',
  'Montana': 'MT',
  'Nebraska': 'NE',
  'Nevada': 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  'Ohio': 'OH',
  'Oklahoma': 'OK',
  'Oregon': 'OR',
  'Pennsylvania': 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  'Tennessee': 'TN',
  'Texas': 'TX',
  'Utah': 'UT',
  'Vermont': 'VT',
  'Virginia': 'VA',
  'Washington': 'WA',
  'West Virginia': 'WV',
  'Wisconsin': 'WI',
  'Wyoming': 'WY'
}









