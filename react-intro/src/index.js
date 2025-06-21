import React from 'react';
import ReactDOM from 'react-dom/client';

//Components import
import {Header} from './components/header/header';
import {Song} from './components/song/song';
import {SongDetails} from './components/songDetails/songDetails';

//Dependencies import
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { GlobalStyle, SongArea } from './indexStyles';

import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Provider store={store}>  

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

    </Provider>

  </React.StrictMode>
);
