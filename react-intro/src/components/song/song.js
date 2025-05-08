import React, { useContext, useState } from 'react';
import './song.css';
import { FavoriteSongContext } from '../../Hooks/favoriteSongContext/FavoriteSongContext';
import useFetchAlbum from '../../Hooks/FetchAlbum/FetchAlbum';
import { useNavigate } from 'react-router-dom';

// FontAwesome icons imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Song() {
  const { addToFavorites } = useContext(FavoriteSongContext);
  const [artistName, setArtistName] = useState(''); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const { albums, loading, error } = useFetchAlbum(searchQuery);
  const navigate = useNavigate();

  
  //This const is used for the search button
  const handleSearch = () => {
    setSearchQuery(artistName); 
  };

  //This const is used for the enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(artistName);
    }
  };

  return (
    <>
      {/* Search Area*/}
      <div className="search-area">

        <input
          type="text"
          id="search"
          placeholder="Search for an artist..."
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)} 
          onKeyPress={handleKeyPress} 
        />
        
        <button id="search-button" onClick={handleSearch}>
          Search
        </button>

      </div>

      {/* Loading message*/}
      {loading && <p>Loading albums...</p>}

      {/* Error message */}
      {error && <p className="error-message">{error}</p>}

      {/* Album section generator */}

      <div className="song-list-area">

        {albums.map((album, index) => (

          <div className="song-main-container" key={index}>

            <div className="song-container">

              {/* This is the link to the song details page */}
            <a
                href="#"
                onClick={(e) => {
                  e.preventDefault(); 
                  navigate('/songDetails', { state: { album: { ...album, artist: artistName} } });
                }}
              >
                {album.coverArt ? (
                  <img
                    src={album.coverArt}
                    alt={`Cover of ${album.title}`}
                    className="album-cover"
                  />
                ) : (
                  <div className="no-cover">No Cover Available</div>
                )}
              </a>

              <div className="song-info-container">

                <div className="song-info-left">

                  <h2>{album.title}</h2>

                  <h3>{artistName}</h3>

                  <p><strong>Release Date:</strong> {album['first-release-date']}</p>

                  <p><strong>Primary Type:</strong> {album['primary-type']}</p>

                </div>

                <div className="song-info-right">

                <FontAwesomeIcon
                  icon={faPlus}
                  id="song-add-button"
                  onClick={() => {
                    const songData = {
                      id: album.id,
                      title: album.title,
                      artist: artistName,
                      img: album.coverArt || 'https://via.placeholder.com/150',
                      year: album['first-release-date'] || 'Unknown Year',
                      genre: album['primary-type'] || 'Unknown Genre',
                      link: album.coverArt || '#',
                    };

                    // Log the song data to the console
                    console.log('Adding to favorites:', songData);

                    // Add the song to favorites
                    addToFavorites(songData);
                  }}
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