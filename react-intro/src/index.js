import React from 'react';
import ReactDOM from 'react-dom/client';
import {Header} from './components/header/header';
import {Song} from './components/song/song';
import {SongDetails} from './components/songDetails/songDetails';
import { GlobalStyle, SongArea } from './indexStyles';

import { FavoriteSongsContext } from './Hooks/favoriteSongContext/FavoriteSongContext';
import { BrowserRouter, Route, Routes } from "react-router";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <FavoriteSongsContext>

    <BrowserRouter>

      <GlobalStyle />

      <Header/>

      <main>

      <SongArea>

            <Routes>

              <Route path="/songSearch" element={<Song/>} />
              <Route path="/songDetails" element={<SongDetails/>} />
              <Route path="/" element={<Song/>} />

            </Routes>

        </SongArea>

      </main>

      </BrowserRouter>

    </FavoriteSongsContext>

  </React.StrictMode>
);
