function ConcertCard(concertData) {
  const event = concertData.data;

  function getLargestImage(images) {
    return images.reduce(
      (max, img) => (img.height > max.height ? img : max),
      images[0],
    );
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  };

  function formatTime(time) {
    const [hours, minutes] = time.split(':').map(Number);
    
    if (!hours && hours !== 0) return null; // handle invalid time

    const period = hours >= 12 ? 'pm' : 'am';

    let convertedHours = hours > 12 ? hours - 12 : hours;
    if (hours === 0) convertedHours = 12;

    // This will make sure that 8:05 is formatted as 8:05 and not 8:5
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${convertedHours}:${formattedMinutes}${period}`;
  }

  function onVenueClick() {
      window.open(`https://www.google.com/maps/search/?api=1&query=${event._embedded.venues[0].address.line1}%20${event._embedded.venues[0].city.name}`, '_blank');
  };

  return (
    <div
      key={event.id}
      className="mx-auto bg-[#f7f7f7] rounded-xl shadow-lg overflow-hidden my-4"
    >
      <div className="p-6 flex items-stretch">
        <div className="w-2/5 relative">
          <img
            src={getLargestImage(event.images).url}
            alt={event.name}
            className="h-full w-full object-cover absolute"
          />
        </div>
        <div className="w-3/5 pl-5">
          <h2 className="text-2xl text-grey-900 font-semibold mb-2">{event.name}</h2>
          <p className="text-gray-500 mb-2">
            {formatDate(event.dates.start.dateTime)} | {formatTime(event.dates.start.localTime)} 
          </p>
          <p className="text-green-500 hover:text-green-600 transition duration-300 cursor-pointer mb-2 flex items-center" data-tip={event._embedded.venues[0].address.line1} onClick={onVenueClick}>
            📍{event._embedded.venues[0].name} | {event._embedded.venues[0].city.name}, {event._embedded.venues[0].state.stateCode}
          </p>
          {
            event.priceRanges &&
            (event.priceRanges[0].min === event.priceRanges[0].max 
              ? <p className="text-gray-500 mb-2">Price: ${event.priceRanges[0].min}</p>
              : <p className="text-gray-500 mb-2">Price: ${event.priceRanges[0].min} - ${event.priceRanges[0].max}</p>)
          }
          {event.dates.status.code === 'onsale' ? 
            <a
              href={event.url}
              className="inline-block mt-2 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-300"
            >
              Buy Tickets
            </a> : <p className="text-red-500">Tickets Not On Sale</p>}
        </div>
      </div>
    </div>
  );
}

export default ConcertCard;
