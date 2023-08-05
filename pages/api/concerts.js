export default async function handler(req, res) {
    const { artist_name } = req.query;
    const API_KEY = "88SmQq3EwlFGmonApvn4QJmAD45IT0GI"; // Replace with your Ticketmaster API key
    const RADIUS = 25;
    const GEO_POINT = 'dp3wjztv';
  
    // const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&keyword=${artist_name}classificationName=music`;
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&classificationName=music&radius=${RADIUS}&geoPoint=${GEO_POINT}&sort=distance,asc&keyword=${artist_name}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      const events = data._embedded?.events || [];
      res.status(200).json(events);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching concert data.' });
    }
  }
  