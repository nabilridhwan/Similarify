import { useEffect} from 'react';
import Search from './Components/Search';
import SpotifyApi from './Libraries/SpotifyApi';
// import logo from './logo.svg';
import './App.css';


import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import LastFMResults from './Components/LastFMResults';

function App() {
  function checkForKey() {
    if (window.location.hash) {
      let hashes = window.location.hash.substring(1).split("&");
      const access_token = 0;

      let hashes_value = hashes.map(hash => hash.split("=")[1]);

      localStorage.setItem("token", hashes_value[access_token]);
    }
  }

  // This will run on start
  useEffect(() => {
    checkForKey();
  }, [])

  return (
    <Router>
      <div className="App container">

      <Routes>
        <Route path="/similar" element={<LastFMResults addedSongs={localStorage.getItem("addedSongs")}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Home />} />
      </Routes>

        <footer className="align-items-center footer mt-auto py-3 text-center">
          <p className="m-0">Nabil. &copy; {new Date().getFullYear()}</p>
          <p className="m-0">Similarify utilizes the <a href="https://developer.spotify.com/documentation/web-api/">official Spotify API</a> and <a href="https://www.last.fm/api">official LastFM API</a>. We LOVE Spotify and LastFM, but we are not affiliated.</p>
          <p>Similarify is <a href="https://github.com/nabilridhwan/Similarify">Open Sourced</a></p>
        </footer>
      </div>

    </Router>
  );
}

export default App;
