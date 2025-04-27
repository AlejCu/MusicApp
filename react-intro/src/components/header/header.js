import React, { useContext, useState } from 'react';
import './header.css';
import { FavoriteSongContext } from '../favoriteSongContext/FavoriteSongContext';

//Import for FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const { favoriteSongs, removeFromFavorites } = useContext(FavoriteSongContext);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <header>

        <div id='header-menu-left'>

          <FontAwesomeIcon icon={faBars} id='header-menu-icon' onClick={toggleMenu}/>

        </div>


        <div id='header-menu-center'>
          
          <h1>Music App</h1>

          <FontAwesomeIcon icon={faCirclePlay} />

        </div>


        <div id='header-menu-right'></div>


      </header>


        <div id="side-menu" className={isMenuVisible ? 'visible' : 'hidden'}>

          <h1>Favorites</h1>

          {favoriteSongs.map((song, index) => (
          <div className="side-menu-container" key={index}>

            <img src={song.img} alt={`Cover of ${song.title}`} />

            <h2>{song.title}</h2>

            <p>{song.artist}</p>

            <p>{song.album}</p>

            <div className='side-menu-info'>

              <p>{song.year}</p>

              <p>{song.genre}</p>

            </div>


            <div className="side-menu-buttons">


              <a href={song.link} target="_blank" rel="noopener noreferrer">
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

export {Header};