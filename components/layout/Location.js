import { useState, useEffect } from 'react';
import axios from 'axios';

function Location() {
  const [location, setLocation] = useState('Loading...');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=dc9ce89774d24ea0bbe468299001bc62`);
          const city = response.data.results[0].components.city;
          setLocation(city);
          setSelectedCity(city);
        } catch (error) {
          console.error("Error: ", error);
        }
      });
    }
    axios.get('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json')
    .then((response) => {
      const uniqueCities = Array.from(new Set(response.data.map(city => city.city)));
      setCities(uniqueCities);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
  }, []);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  }

  return (
    <div className="Location">
      <select value={selectedCity} onChange={handleCityChange}>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
}

export default Location;



