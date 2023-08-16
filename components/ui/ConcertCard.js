function ConcertCard(concertData) {
  const event = concertData.data;

  function getLargestImage(images) {
    return images.reduce(
      (max, img) => (img.height > max.height ? img : max),
      images[0],
    );
  }

  return (
    <div
      key={event.id}
      className="mx-auto bg-white rounded-xl shadow-md overflow-hidden my-4"
    >
      <div className="p-8 bg-pink-100 flex items-stretch">
        <div className="w-2/5 relative">
          <img
            src={getLargestImage(event.images).url}
            alt={event.name}
            className="h-full w-full object-cover absolute"
          ></img>
        </div>
        <div className="w-3/5">
          <h2 className="text-xl font-semibold">{event.name}</h2>
          <p className="mt-2 text-gray-500">
            Event Date: {event.dates.start.localDate}
          </p>
          <p className="text-gray-500">
            Venue: {event._embedded.venues[0].name}
          </p>
          <p className="text-gray-500">Status: {event.dates.status.code}</p>
          <a
            href={event.url}
            className="text-indigo-600 hover:text-indigo-400 mt-2"
          >
            Buy Tickets
          </a>
        </div>
      </div>
      <hr className="border-gray-200" />
    </div>
  );
}

export default ConcertCard;
