import { useLocation } from 'react-router-dom';
import { SongDetailsContainer, ImageContainer } from './songDetailsStlyes';

function SongDetails() {
  const location = useLocation();
  const { album } = location.state || {};
  

  if (!album) {
    return <p>No album details available.</p>;
  }

  return (

    <SongDetailsContainer>

      <ImageContainer>

        <img
          src={album.coverArt || 'https://via.placeholder.com/150'}
          alt={`Cover of ${album.title}`}
          className="album-cover"
        />

      </ImageContainer>

      <h1>{album.title || 'Unknown Title'}</h1>

      <h2>{album.artist}</h2>

      <p><strong>Release Date:</strong> {album['first-release-date'] || 'Unknown Release Date'}</p>

      <p>{album['primary-type'] || 'Unknown Genre'}</p>

    </SongDetailsContainer>
  );
}

export { SongDetails };