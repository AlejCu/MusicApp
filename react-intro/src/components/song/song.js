import React, { useContext, useState } from 'react';
import './song.css';
import { FavoriteSongContext } from '../../Hooks/favoriteSongContext/FavoriteSongContext';
import useFetchAlbum from '../../Hooks/FetchAlbum/FetchAlbum';

// FontAwesome icons imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Song() {
  const { addToFavorites } = useContext(FavoriteSongContext);
  const [artistName, setArtistName] = useState(''); 
  const { albums, loading, error } = useFetchAlbum(artistName); 

  console.log('Artist Name:', artistName);
  console.log('Albums:', albums);

  return (
    <>
      <div className="search-area">

        <input
          type="text"
          id="search"
          placeholder="Search for an artist..."
          value={artistName} 
          onChange={(e) => setArtistName(e.target.value)} 
        />

        <button id="search-button" onClick={() => setArtistName('')}>
          Clear
        </button>

      </div>

      {loading && <p>Loading albums...</p>}

      {error && <p className="error-message">{error}</p>}


      <div className="song-list-area">

        {albums.map((album, index) => (

          <div className="song-main-container" key={index}>

            <div className="song-container">

              <a href={album.strAlbumThumb} target="_blank" rel="noopener noreferrer">

                {album.strAlbumThumb && (

                  <img
                    src={album.strAlbumThumb}
                    alt={`Portada de ${album.strAlbum}`}
                  />

                )}

              </a>

              <div className="song-info-container">

                <div className="song-info-left">

                  <h2>{album.strAlbum}</h2>

                  <h3>{album.strArtist}</h3>

                  <p>{album.strLabel}</p>

                  <p>{album.intYearReleased}</p>

                  <p>{album.strGenre}</p>

                </div>

                <div className="song-info-right">


                  {/*Add to favorites button*/}
                  <FontAwesomeIcon
                    icon={faPlus}
                    id="song-add-button"
                    onClick={() => addToFavorites(album)}
                  />

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </>
  );
}

export { Song };