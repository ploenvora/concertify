export default async function handler(req, res) {
  const { artist_name, geoPoint, radius } = req.query;
  const API_KEY = "O11SIYQARG4qdXsDr0PeUeYT3f89JzkT"; // Replace with your Ticketmaster API key

  // const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&keyword=${artist_name}classificationName=music`;
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&classificationName=music&radius=${radius}&geoPoint=${geoPoint}&sort=distance,asc&keyword=${artist_name}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const events = data._embedded?.events || [];
    res.status(200).json(events);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching concert data." });
  }
}
