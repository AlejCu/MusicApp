import { useState, useEffect } from 'react';

function useFetchArtist(artistId) {

//States being used for the fetch
  const [artist, setArtist] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (!artistId) return;

    const fetchArtist = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/v1/json/2/artist.php?i=${artistId}`
        );
        const data = await response.json();

        if (data.artists) {
          setArtist(data.artists[0]);
        } else {
          setArtist(null);
        }
      } catch (err) {
        setError('We could not find the artist you were looking for :( . Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [artistId]);

  return { artist, loading, error };
}

export default useFetchArtist;