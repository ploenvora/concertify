import { useState, useEffect } from 'react';
import ConcertCard from '../ui/ConcertCard';

function Concerts(props) {

    const [error, setError] = useState()
    const [concerts, setConcerts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [locationChange, setLocationChange] = useState('')

    // function that does the fetching
    async function fetchConcertData() {
        setIsLoading(true);
        setError(null);
        try {
        console.log(props.city, props.state)
        const dataArray = [];
        for (const artistName of props.artistNames) {
            const response = await fetch(`/api/concerts?artist_name=${encodeURIComponent(artistName)}`);
            const data = await response.json();
            dataArray.push(data);
            await new Promise(resolve => setTimeout(resolve, 100)); // 3-second delay between fetches
        }
        // filtering data we have seen before
        let combinedData = dataArray.flat()
        let seen = new Map()
        combinedData = combinedData.filter((item) => {
            const valueSeen = seen.get(item.id);
            if (valueSeen) {
                return false;
            }
            seen.set(item.id, true);
            return true;
        });
        // putting the item in local storage so refreshing or exiting out of the page doesnt reload data
        await localStorage.setItem('concerts', JSON.stringify(combinedData));
        await localStorage.setItem('location', props.location);
        setConcerts(combinedData);
        } catch (error) {
            console.log(error);
            setError('An error occurred while fetching concert data.');
        }
      setIsLoading(false);
    }
    
    useEffect(() => {
        // given that the artistNames are loaded in 
        if (props.artistNames && props.artistNames.length > 0) {
            const storedConcerts = localStorage.getItem('concerts');
            const storedLocation = localStorage.getItem('location');
            console.log("stored location", storedLocation, "props.location", props.location);
            if (storedConcerts && storedConcerts != 'undefined' && props.location === storedLocation) {
                setConcerts(JSON.parse(storedConcerts));
            } else if (props.location.length > 0) {
                localStorage.removeItem('location');
                localStorage.setItem('location', props.location);
                fetchConcertData();
            }
        }
    }, [props.artistNames, props.location]);

    return (
        <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {concerts.map((concert) => (
        <ConcertCard key={concert.id} data={concert} />
        ))}
        </div>
    );
}

export default Concerts;
