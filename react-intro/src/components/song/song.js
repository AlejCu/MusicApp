import React, { useContext, useState } from 'react';
import './song.css'
import { FavoriteSongContext } from '../favoriteSongContext/FavoriteSongContext';

//Image imports
import dieHardImage from '../../img/die-hard-kendrick-lamar.jpg';
import yourManImage from '../../img/your-man-joji.jpg'
import callMeBackImage from '../../img/call-me-back-chase-atlantic.jpg'
import slowDancingImage from '../../img/slow-dancing-in-the-dark-joji.jpg'
import notLikeUsImage from '../../img/not-like-us-kendrick-lamar.jpg'
import consumeImage from '../../img/consume-chase-atlantic.jpg'
import circlesImage from '../../img/circles-post-malone.jpg'
import rockstarImage from '../../img/rockstar-post-malone.jpg'

//FontAwesome icons imports
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
    id: 1,
  },

  {
    title: "Your Man",
    artist: "Joji",
    album: "Nectar",
    year: 2020,
    genre: "R&B",
    img: yourManImage,
    link: "https://www.youtube.com/watch?v=RrtkU7i0qD8&ab_channel=88rising",
    id: 2,
  },

  {
    title: "Call me back",
    artist: "Chase Atlantic",
    album: "beauty in death",
    year: 2021,
    genre: "Pop",
    img: callMeBackImage,
    link: "https://www.youtube.com/watch?v=SNZfK06U68g&ab_channel=CHASEATLANTIC",
    id: 3,
  },

  {
    title: "Slow Dancing in the Dark",
    artist: "Joji",
    album: "BALLADS 1",
    year: 2018,
    genre: "R&B",
    img: slowDancingImage,
    link: "https://www.youtube.com/watch?v=K3Qzzggn--s&ab_channel=88rising",
    id: 4,
  },

  {
    title: "Not Like Us",
    artist: "Kendrick Lamar",
    album: "Mr. Morale & The Big Steppers",
    year: 2022,
    genre: "Hip-Hop",
    img: notLikeUsImage,
    link: "https://www.youtube.com/watch?v=H58vbez_m4E&ab_channel=KendrickLamarVEVO",
    id: 5,
  },

  {
    title: "Consume",
    artist: "Chase Atlantic",
    album: "Dying to Live",
    year: 2017,
    genre: "Pop",
    img: consumeImage,
    link: "https://www.youtube.com/watch?v=oCdXuomafSU&ab_channel=CHASEATLANTIC",
    id: 6,
  },

  {
    title: "Circles",
    artist: "Post Malone",
    album: "Hollywood's Bleeding",
    year: 2019,
    genre: "Pop",
    img: circlesImage,
    link: "https://www.youtube.com/watch?v=wXhTHyIgQ_U&ab_channel=PostMaloneVEVO",
    id: 7,
  },

  {
    title: "Rockstar",
    artist: "Post Malone",
    album: "Beerbongs & Bentleys",
    year: 2018,
    genre: "Pop",
    img: rockstarImage,
    link: "https://www.youtube.com/watch?v=UceaB4D0jpo&ab_channel=PostMaloneVEVO",
    id: 8,
  }
];


  //This creates a song card for each song in the songList array
  function Song() {

    const { addToFavorites } = useContext(FavoriteSongContext);
    const [searchTerm, setSearchTerm] = useState('');
  
    // Song filter using search term
    const filteredSongs = songList.filter((song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <>

        <div className="search-area">

          <input type="text" id="search" placeholder="Search for a song..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

          <button id="search-button" onClick={() => setSearchTerm('')}>Clear</button>

        </div>

        <div className="song-list-area">
  
          {filteredSongs.map((song, index) => (

            <div className="song-main-container" key={index}>

              <div className="song-container">

                <a href={song.link} target="_blank" rel="noopener noreferrer">

                  {song.img && <img src={song.img} alt={`Portada de ${song.title}`} />}

                </a>


                <div className="song-info-container">

                  <div className="song-info-left">

                    <h2>{song.title}</h2>

                    <h3>{song.artist}</h3>

                    <p>{song.album}</p>

                    <p>{song.year}</p>

                    <p>{song.genre}</p>

                  </div>


                  <div className="song-info-right">

                    <FontAwesomeIcon icon={faPlus} id="song-add-button" onClick={() => addToFavorites(song)}/>
                  
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