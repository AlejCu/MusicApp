import React, { useContext, useState } from 'react';
import './header.css';
import { FavoriteSongContext } from '../../Hooks/favoriteSongContext/FavoriteSongContext';
import { Link } from 'react-router-dom';

// Import for FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCirclePlay, faPlay, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const { favoriteSongs, removeFromFavorites } = useContext(FavoriteSongContext);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <header>

        <div id="header-menu-left">

          <FontAwesomeIcon icon={faBars} id="header-menu-icon" onClick={toggleMenu} />

        </div>

        <div id="header-menu-center">

          <Link to="/songSearch">

            <h1>Music App</h1>

          <FontAwesomeIcon icon={faCirclePlay} />

          </Link>

        </div>

        <div id="header-menu-right"></div>

      </header>

      <div id="side-menu" className={isMenuVisible ? 'visible' : 'hidden'}>

        <h1>Favorites</h1>

        {favoriteSongs.map((song, index) => (

          <div className="side-menu-container" key={index}>

            <img
              src={song.img}
              alt={`Cover of ${song.title}`}
              className="album-cover"
            />

            <h1>{song.title || 'Unknown Title'}</h1>

            <h2>{song.artist || 'Unknown Artist'}</h2>

            <div className="side-menu-info">

              <p>{song.year || 'Unknown Year'}</p>

              <p>{song.genre || 'Unknown Genre'}</p>

            </div>

            <div className="side-menu-buttons">

              <a>

                <FontAwesomeIcon icon={faPlay} />

              </a>

              <FontAwesomeIcon icon={faTrashCan} onClick={() => removeFromFavorites(song)} />

            </div>

          </div>

        ))}

      </div>
    </>
  );
}

export { Header };