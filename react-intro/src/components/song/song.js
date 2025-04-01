import React, { Component } from 'react';
import './song.css'
import dieHardImage from '../../img/die-hard-kendrick-lamar.jpg';
import yourManImage from '../../img/your-man-joji.jpg'
import callMeBackImage from '../../img/call-me-back-chase-atlantic.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


//This contains the song information used to fill in the cards
const songList = [
  {
    title: "Die Hard",
    artist: "Kendrick Lamar",
    album: "Mr. Morale & The Big Steppers",
    year: 2022,
    genre: "Hip-Hop",
    img: dieHardImage,
    link: "https://www.youtube.com/watch?v=Lx3MGrafykU&ab_channel=KendrickLamar",
  },

  {
    title: "Your Man",
    artist: "Joji",
    album: "Nectar",
    year: 2020,
    genre: "R&B",
    img: yourManImage,
    link: "https://www.youtube.com/watch?v=RrtkU7i0qD8&ab_channel=88rising"
  },

  {
    title: "Call me back",
    artist: "Chase Atlantic",
    album: "beauty in death",
    year: 2021,
    genre: "Pop",
    img: callMeBackImage,
    link: "https://www.youtube.com/watch?v=SNZfK06U68g&ab_channel=CHASEATLANTIC"
  }
];

class Song extends Component {
  componentDidMount() {
    console.log('Component Song has been mounted!');
    songList.forEach((s) => {
      console.log(`Loaded song: ${s.title} by ${s.artist}`);
    });
  }

  //This creates a song card for each song in the songList array
  render() {
    return (
      <>
        {songList.map((songList, index) => (

          <div className="song-main-container" key={index}>

            <div className="song-container">

              <a href={songList.link} target="_blank" rel="noopener noreferrer">
                
                {songList.img && <img src={songList.img} alt={`Portada de ${songList.title}`} />}

              </a>

              <div className="song-info-container">

                <div className="song-info-left">

                  <h2>{songList.title}</h2>

                  <h3>{songList.artist}</h3>

                  <p>{songList.album}</p>

                  <p>{songList.year}</p>

                  <p>{songList.genre}</p>

                </div>

                <div className="song-info-right">

                  <FontAwesomeIcon icon={faPlus} id="song-add-button" />

                </div>

              </div>

            </div>
            
          </div>
        ))}
      </>
    );
  }
}

export { Song };