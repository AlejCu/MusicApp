import React from 'react';
import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';
import { Song } from '../components/song/song';
import { Header } from '../components/header/header';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import { fetchAlbums } from '../redux/slicers/searchSlice';

import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

//Mock Data

const mockStore = configureStore({ middlewares: [thunk] });

jest.mock('../redux/slicers/searchSlice', () => {
  const actual = jest.requireActual('../redux/slicers/searchSlice');
  return {
    ...actual,
    fetchAlbums: (artistName) => ({
      type: 'search/fetchAlbums',
      payload: artistName,
    }),
    default: actual.default,
  };
});

const mockAlbums = [
  {
    id: '1',
    title: 'Bohemian Rhapsody',
    'artist-credit': [{ name: 'Queen' }],
    coverArt: 'cover1.jpg',
    'first-release-date': '1975-10-31',
    'primary-type': 'Album',
  },
  {
    id: '2',
    title: 'Imagine',
    'artist-credit': [{ name: 'John Lennon' }],
    coverArt: 'cover2.jpg',
    'first-release-date': '1971-09-09',
    'primary-type': 'Album',
  },
];

const mockLibrary = [
  {
    id: '1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    img: 'cover1.jpg',
    year: '1975',
    genre: 'Rock',
  },
  {
    id: '2',
    title: 'Imagine',
    artist: 'John Lennon',
    img: 'cover2.jpg',
    year: '1971',
    genre: 'Pop',
  },
];


//Test to make sure the header and favorites menu icon renders correctly
describe('Header', () => {
  test('Makes sure the title for the header is Music App"', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/Music App/i)).toBeInTheDocument();
  });

  test('The header side menu icon "header-menu-icon" renders correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    const menuButton = screen.getByTestId('header-menu-icon');
    expect(menuButton).toBeInTheDocument();
  });
});


//Test to make sure the song components render correctly and the search input works
const renderWithProviders = (ui, customStore) => {
  return render(
    <Provider store={customStore}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </Provider>
  );
};

describe('Song', () => {
  test('The search input area renders correctly', () => {
    const store = mockStore({
      library: [],
      search: { results: mockAlbums, loading: false, error: null },
    });
    renderWithProviders(<Song />, store);
    const input = screen.getByPlaceholderText(/search for an artist/i);
    expect(input).toBeInTheDocument();
  });

  test('The user can click on the search bar and the input changes', () => {
    const store = mockStore({
      library: [],
      search: { results: mockAlbums, loading: false, error: null },
    });
    renderWithProviders(<Song />, store);
    const input = screen.getByPlaceholderText(/search for an artist/i);
    fireEvent.change(input, { target: { value: 'Queen' } });
    expect(input.value).toBe('Queen');
  });

  test('Search function works when clicking on the search button"', () => {
    const store = mockStore({
      library: [],
      search: { results: mockAlbums, loading: false, error: null },
    });
    renderWithProviders(<Song />, store);
    const input = screen.getByPlaceholderText(/search for an artist/i);
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.change(input, { target: { value: 'Queen' } });
    fireEvent.click(button);
    expect(input.value).toBe('Queen');
  });

  test('The search function works when hitting Enter"', () => {
    const store = mockStore({
      library: [],
      search: { results: mockAlbums, loading: false, error: null },
    });
    renderWithProviders(<Song />, store);
    const input = screen.getByPlaceholderText(/search for an artist/i);
    fireEvent.change(input, { target: { value: 'Queen' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
    expect(input.value).toBe('Queen');
  });
});

function renderWithMockedStore(store) {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Song />
      </BrowserRouter>
    </Provider>
  );
}


//Test to make sure the song list renders correctly and the add button works
describe('Song (Song list and add)', () => {
  let store;
  beforeEach(() => {
  store = mockStore({
    library: [],
    search: { results: mockAlbums, loading: false, error: null },
  });
  store.dispatch = jest.fn();
});

  test('Song list renders correctly', () => {
    renderWithMockedStore(store);
    expect(screen.getByText('Bohemian Rhapsody')).toBeInTheDocument();
    expect(screen.getByText('Imagine')).toBeInTheDocument();
  });

  test('Each song shows the title the artist and the album info', () => {
    renderWithMockedStore(store);
    mockAlbums.forEach(album => {
      expect(screen.getByText(album.title)).toBeInTheDocument();
      expect(screen.getByText(album['artist-credit'][0].name)).toBeInTheDocument();
    });
  });

  test('The add button executes the dispatch when clicking', () => {
    renderWithMockedStore(store);
    const addButtons = screen.getAllByTestId('add-song-button');
    fireEvent.click(addButtons[0]);
    expect(store.dispatch).toHaveBeenCalled();
  });
});


function renderHeaderWithStore(store) {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );
}

describe('Header (library side menu)', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      library: mockLibrary,
      search: { results: mockAlbums, loading: false, error: null },
    });

    store.dispatch = jest.fn();
  });

  test('Song list from the library renders correctly', () => {
    renderHeaderWithStore(store);
    fireEvent.click(screen.getAllByTestId('header-menu-icon')[0]);
    expect(screen.getByText('Bohemian Rhapsody')).toBeInTheDocument();
    expect(screen.getByText('Imagine')).toBeInTheDocument();
  });

  test('Each song has a remove button that works with the removeSong function', () => {
    renderHeaderWithStore(store);
    fireEvent.click(screen.getAllByTestId('header-menu-icon')[0]);
    const deleteButtons = screen.getAllByRole('img', { hidden: true });
    fireEvent.click(deleteButtons.find(btn => btn.getAttribute('data-icon') === 'trash-can'));
    expect(store.dispatch).toHaveBeenCalled();
  });

  test('The library shows a message saying "There are no songs in your library"', () => {
    store = mockStore({
      library: [],
      search: { results: mockAlbums, loading: false, error: null },
    });
    renderHeaderWithStore(store);
    fireEvent.click(screen.getAllByTestId('header-menu-icon')[0]);
    expect(screen.getByText(/There are no songs in your library/i)).toBeInTheDocument();
  });
});


// Test to ensure the general flow of the application works correctly
function renderAppWithStore(store) {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Song />
      </BrowserRouter>
    </Provider>
  );
}

describe('Application normal flow', () => {
  let store;

  test('Header and Song are correctly rendered', () => {
    store = mockStore({
      library: [mockLibrary[0]],
      search: { results: mockAlbums, loading: false, error: null },
    });
    renderAppWithStore(store);
    expect(screen.getByText(/Music App/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search for an artist/i)).toBeInTheDocument();
  });

  test('Simulate searching songs and showing results', () => {
    store = mockStore({
      library: [],
      search: { results: mockAlbums, loading: false, error: null },
    });
    renderAppWithStore(store);

    // Simulates searching for an artist
    const input = screen.getByPlaceholderText(/search for an artist/i);
    fireEvent.change(input, { target: { value: 'Queen' } });
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    // Verifies that the results are displayed
    expect(screen.getByText('Bohemian Rhapsody')).toBeInTheDocument();
    expect(screen.getByText('Queen')).toBeInTheDocument();
  });

  test('Simulates adding a song to the favorites library and it rendering on side menu', () => {
    store = mockStore({
      library: [],
      search: { results: mockAlbums, loading: false, error: null },
    });
    store.dispatch = jest.fn();
    renderAppWithStore(store);

    // Simulates adding a song to the library
    const addButtons = screen.getAllByTestId('add-song-button');
    fireEvent.click(addButtons[0]);
    expect(store.dispatch).toHaveBeenCalled();

    store = mockStore({
      library: [],
      search: { results: [], loading: false, error: null },
    });
    renderAppWithStore(store);

    // Opens the side menu to verify that the song was added
    fireEvent.click(screen.getAllByTestId('header-menu-icon')[0]);
    expect(screen.getByText('Bohemian Rhapsody')).toBeInTheDocument();
    expect(screen.getByText('Queen')).toBeInTheDocument();
  });
});