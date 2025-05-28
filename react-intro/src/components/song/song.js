import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSong } from '../../redux/libraryActions';
import { SongMainContainer, SongListArea, SongContainer, SongInfoContainer, SongInfoRight, SearchArea } from './songStyles';
import useFetchAlbum from '../../Hooks/FetchAlbum/FetchAlbum';
import { useNavigate } from 'react-router-dom';

// FontAwesome icons imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Song() {
  const dispatch = useDispatch();
  const favoriteSongs = useSelector(state => state.library);
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
      <SearchArea>

        <input
          type="text"
          id="search"
          placeholder="Search for an artist..."
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)} 
          onKeyPress={handleKeyPress} 
        />
        
        <button id="searchButton" onClick={handleSearch}>
          Search
        </button>

      </SearchArea>

      {/* Loading message*/}
      {loading && <p>Loading albums...</p>}

      {/* Error message */}
      {error && <p className="error-message">{error}</p>}

      {/* Album section generator */}

      <SongListArea>

        {albums.map((album, index) => {
          const isFavorite = favoriteSongs.some(fav => fav.id === album.id);

          return (
          <SongMainContainer key={index}>

            <SongContainer>

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

              <SongInfoContainer>

                <div className="songInfoLeft">

                  <h2>{album.title}</h2>

                  <h3>{artistName}</h3>

                  <p><strong>Release Date:</strong> {album['first-release-date']}</p>

                  <p><strong>Primary Type:</strong> {album['primary-type']}</p>

                </div>

                <SongInfoRight $isFavorite={isFavorite}>

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

                    // Add the song to favorites
                    dispatch(addSong(songData));
                  }}
                  />

                </SongInfoRight>

              </SongInfoContainer>

            </SongContainer>

          </SongMainContainer>
          );
        })}
        
      </SongListArea>

    </>
  );
}

export { Song };