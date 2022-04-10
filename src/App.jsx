import { Route, Routes, Navigate } from 'react-router-dom'

// Pages
import Search from './Pages/Search';
import Recommendation from './Pages/Recommendation';
import Error from './Pages/Error';

import { createStore } from 'redux'
import { Provider } from 'react-redux';
import allReducers from './reducers/index.js';
import { AnimatePresence } from 'framer-motion';
import Home from './Pages/Home';
import AuthenticationFailed from './Pages/AuthenticationFailed';
import Authenticate from './Pages/Authenticate';
import LikedSongs from './Pages/LikedSongs';
import Playlists from './Pages/Playlists';
import PlaylistSongSelect from './Pages/PlaylistSongSelect';
import { Changelog } from './Pages/Changelog';
import RecentlyPlayed from './Pages/RecentlyPlayed';
import About from './Pages/About';

function saveToLocalStorage(state) {
  try {
    let s = { ...state }
    // delete s.apiKey
    // delete s.playlistSongs
    delete s.songs
    delete s.searchTerm
    delete s.searchResults

    const serialisedState = JSON.stringify(s);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}



let store = createStore(allReducers, loadFromLocalStorage(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// let store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
store.subscribe(() => saveToLocalStorage(store.getState()))

function App() {
  return (
    <Provider store={store}>
      <AnimatePresence>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/likedsongs" element={<LikedSongs />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/recentlyplayed" element={<RecentlyPlayed/>} />
          <Route path="/about" element={<About />} />

          <Route path="/playlist/:id" element={<PlaylistSongSelect />} />

          <Route path="/error/:errno" element={<Error />} />
          <Route path="/authenticationfailed" element={<AuthenticationFailed />} />
          <Route path="*" element={<Navigate to={"/error/404"} />} />

        </Routes>

      </AnimatePresence>
    </Provider >
  )
}

export default App;
