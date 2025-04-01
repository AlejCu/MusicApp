import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header>

      <div id='header-menu-left'>

        <FontAwesomeIcon icon={faBars} id='header-menu-icon' />

      </div>

      <div id='header-menu-center'>

        <h1>Music App</h1>

        <FontAwesomeIcon icon={faCirclePlay} />

      </div> 

      <div id='header-menu-right'>

      </div>
        
    </header>
  );
}

export {Header};