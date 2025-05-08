import { useLocation } from 'react-router-dom';
import './songDetails.css';

function SongDetails() {
  const location = useLocation();
  const { album } = location.state || {};
  

  if (!album) {
    return <p>No album details available.</p>;
  }

  return (

    <div className="song-details-container">

      <div className="image-container">

        <img
          src={album.coverArt || 'https://via.placeholder.com/150'}
          alt={`Cover of ${album.title}`}
          className="album-cover"
        />

      </div>

      <h1>{album.title || 'Unknown Title'}</h1>

      <h2>{album.artist}</h2>

      <p><strong>Release Date:</strong> {album['first-release-date'] || 'Unknown Release Date'}</p>

      <p>{album['primary-type'] || 'Unknown Genre'}</p>

    </div>
  );
}

export { SongDetails };