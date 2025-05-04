import { useState, useEffect } from 'react';

function useFetchAlbum(artistName) {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!artistName) return;

    const fetchAlbums = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/v1/json/2/searchalbum.php?s=${artistName}`
        );
        const data = await response.json();
        console.log('API Response:', data);

        if (data.album) {
          setAlbums(data.album);
        } else {
          setAlbums([]);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('We could not find the album you are looking for :( . Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [artistName]);

  return { albums, loading, error };
}

export default useFetchAlbum;