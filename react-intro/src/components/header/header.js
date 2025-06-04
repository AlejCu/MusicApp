import React, { useContext, useState } from 'react';
import { HeaderStyles, SideMenu,  } from './headerStyles';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeSong } from '../../redux/slicers/librarySlice';

// Import for FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCirclePlay, faPlay, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const favoriteSongs = useSelector (state => state.library);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <HeaderStyles>

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

      </HeaderStyles>

      <SideMenu className={isMenuVisible ? 'visible' : 'hidden'}>

        <h1>Favorites</h1>

        {favoriteSongs.map((song, index) => (

          <div className="side-menu-container" key={index}>

            <img
              src={song.img}
              alt={`Cover of ${song.title}`}
              className="album-cover"
            />

            <h2>{song.title || 'Unknown Title'}</h2>

            <h3>{song.artist || 'Unknown Artist'}</h3>

            <div className="side-menu-info">

              <p>{song.year || 'Unknown Year'}</p>

              <p>{song.genre || 'Unknown Genre'}</p>

            </div>

            <div className="side-menu-buttons">

              <a>

                <FontAwesomeIcon icon={faPlay} />

              </a>

              <FontAwesomeIcon icon={faTrashCan} onClick={() => dispatch(removeSong(song.id))} />

            </div>

          </div>

        ))}

      </SideMenu>
    </>
  );
}

export { Header };