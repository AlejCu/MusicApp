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
        //This is the first request to get the artist ID
        const artistResponse = await fetch(
          `https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(artistName)}&fmt=json`
        );

        if (!artistResponse.ok) {
          throw new Error(`HTTP error! status: ${artistResponse.status}`);
        }

        const artistData = await artistResponse.json();
        

        if (!artistData.artists || artistData.artists.length === 0) {
          setAlbums([]);
          setError(`No se encontro ningun artista con el nombre "${artistName}".`);
          return;
        }

        const artistId = artistData.artists[0].id;

        //This is the second request to get the albums using the artist ID
        const albumResponse = await fetch(
          `https://musicbrainz.org/ws/2/release-group?artist=${artistId}&type=album&fmt=json`
        );

        if (!albumResponse.ok) {
          throw new Error(`HTTP error! status: ${albumResponse.status}`);
        }

        const albumData = await albumResponse.json();

        //This was added to be able to pull images into the app
        if (albumData['release-groups']) {
          const albumsWithCovers = await Promise.all(
            albumData['release-groups'].map(async (album) => {
              const coverArtUrl = `https://coverartarchive.org/release-group/${album.id}/front`;
              try {
                const coverResponse = await fetch(coverArtUrl);
                if (coverResponse.ok) {
                  album.coverArt = coverArtUrl; 
                } else {
                  album.coverArt = null; 
                }
              } catch {
                album.coverArt = null; 
              }
              return album;
            })
          );

          setAlbums(albumsWithCovers); 
        } else {
          setAlbums([]);
        }
      } catch (err) {
        console.error('Fetch error:', err); 
        setError('We could not fetch the albums. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [artistName]);

  return { albums, loading, error };
}

export default useFetchAlbum;