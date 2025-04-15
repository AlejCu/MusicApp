import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {Header} from './components/header/header';
import {Song} from './components/song/song';
import { FavoriteSongsProvider } from './components/favoriteSongContext/FavoriteSongContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <FavoriteSongsProvider>

      <Header/>

      <main>

        <div className="song-area">

          <Song/>

        </div>

      </main>

    </FavoriteSongsProvider>

  </React.StrictMode>
);
