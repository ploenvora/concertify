import classes from './Card.module.css';

function ConcertCard(concertData) {
  const event = concertData.data
  return (
    <div key={event.id}>
        <h2>{event.name}</h2>
        <p>Event Date: {event.dates.start.localDate}</p>
        <p>Venue: {event._embedded.venues[0].name}</p>
        <p>Status: {event.dates.status.code}</p>
        <a href={event.url}>Buy Tickets</a>
        <hr/>
    </div>
  );
}

export default ConcertCard;
