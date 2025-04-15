import React, { createContext, useState } from 'react';

export const FavoriteSongsContext = createContext();

export const FavoriteSongsProvider = ({ children }) => {
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  // Function to add to favorites
  const addToFavorites = (song) => {

    setFavoriteSongs((prevFavorites) => {

      if (!prevFavorites.some((favSong) => favSong.title === song.title)) {
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
        (favSong) => favSong.title !== song.title
      );

      console.log(`Removed ${song.title} by ${song.artist} from favorites!`);
      return updatedFavorites;

    });
    
  };

  return (
    <FavoriteSongsContext.Provider value={{ favoriteSongs, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoriteSongsContext.Provider>
  );
};