import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {Header} from './components/header/header';
import {Song} from './components/song/song';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>

    <main>

      <div className="song-area">

        <Song/>

      </div>

    </main>

  </React.StrictMode>
);
