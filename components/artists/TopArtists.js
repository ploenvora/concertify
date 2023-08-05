import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import useSpotify from "../../hooks/useSpotify";

function TopArtists( {onArtistNames} ) {
    const [artists, setArtists] = useState([]);
    const { data: session } = useSession();
    const spotifyApi = useSpotify();

    useEffect(() => {
        if (session && spotifyApi.getAccessToken()) {
            Promise.all([
                spotifyApi.getMyTopArtists({ limit: 50, time_range: 'short_term' }),
                spotifyApi.getMyTopArtists({ limit: 50, time_range: 'medium_term' }),
                spotifyApi.getMyTopArtists({ limit: 50, time_range: 'long_term' }),
            ]).then(([shortData, mediumData, longData]) => {
                setArtists(mergeAndFilter(shortData.body.items, mediumData.body.items, longData.body.items));
            });
        }
    }, [session, spotifyApi]);

    useEffect(() => {
        // this effect will run whenever artists changes
        onArtistNames(artists.map((artist) => (artist.name)));
      }, [artists]);

    // helper function to merge and filter data
    function mergeAndFilter(shortTerm, mediumTerm, longTerm) {
        const mergedArtists = [...shortTerm, ...mediumTerm, ...longTerm];
        const filteredArtists = mergedArtists.filter((artist, index, self) => {
            return index === self.findIndex((a) => a.id === artist.id);
        });
        return filteredArtists;
    }

    return (
        <div>
            <p>Hi!</p>
            {/* {artists ? (
            artists.map((artist) => (
              <p key={artist.id}>{artist.name}</p>
            ))
          ) : (
            <p>No artists available</p>
          )} */}
        </div>
    );
}

export default TopArtists;
