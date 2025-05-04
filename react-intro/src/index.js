import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {Header} from './components/header/header';
import {Song} from './components/song/song';
import {SongDetails} from './components/songDetails/songDetails';

import { FavoriteSongsContext } from './Hooks/favoriteSongContext/FavoriteSongContext';
import { BrowserRouter, Route, Routes } from "react-router";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <FavoriteSongsContext>

      <Header/>

      <main>

      <div className="song-area">

          <BrowserRouter>

            <Routes>

              <Route path="/songSearch" element={<Song/>} />
              <Route path="/songDetails" element={<SongDetails/>} />
              <Route path="/" element={<Song/>} />

            </Routes>

          </BrowserRouter>

        </div>

      </main>

    </FavoriteSongsContext>

  </React.StrictMode>
);
