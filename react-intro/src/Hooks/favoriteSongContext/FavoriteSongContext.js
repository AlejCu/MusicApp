import React, { createContext, useState, useEffect } from 'react';

export const FavoriteSongContext = createContext();

export const FavoriteSongsContext = ({ children }) => {
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  // Load favorites from Local Storage when the app starts
  useEffect(() => {

    const storedFavorites = localStorage.getItem('favoriteSongs');
    if (storedFavorites) {

      setFavoriteSongs(JSON.parse(storedFavorites));
    }

  }, []);

  // Save favorites to Local Storage whenever they change
  useEffect(() => {

    localStorage.setItem('favoriteSongs', JSON.stringify(favoriteSongs));
  }, [favoriteSongs]);

  // Function to add to favorites
  const addToFavorites = (song) => {

    setFavoriteSongs((prevFavorites) => {

      if (!prevFavorites.some((favSong) => favSong.id === song.id)) {
        console.log(`Added ${song.title} by ${song.artist} to favorites!`);
        return [...prevFavorites, song];
      } 
      
      else {

        console.log(`${song.title} by ${song.artist} is already in favorites!`);
        return prevFavorites;
      }

    });

  };

  // Function to remove from favorites
  const removeFromFavorites = (song) => {

    setFavoriteSongs((prevFavorites) => {

      const updatedFavorites = prevFavorites.filter(
        (favSong) => favSong.id !== song.id
      );

      console.log(`Removed ${song.title} by ${song.artist} from favorites!`);
      return updatedFavorites;

    });
  };

  return (

    <FavoriteSongContext.Provider value={{ favoriteSongs, addToFavorites, removeFromFavorites }}>

      {children}

    </FavoriteSongContext.Provider>
    
  );
};