import { useEffect, useState } from 'react';
import Search from './Components/Search';
import SpotifyApi from './Libraries/SpotifyApi';
// import logo from './logo.svg';
import './App.css';

// Make a get request to https://accounts.spotify.com/authorize with the following parameters:
// client_id: your client id
// response_type: token
// redirect_uri: your redirect uri
// scope: user-read-private, user-read-email, playlist-read-private, playlist-modify-public, playlist-modify-private
// state: first-auth
// show_dialog: true


function App() {
  const [token, setToken] = useState(null);

  function authenticateSpotify() {
    new SpotifyApi().authenticateUser()
  }

  function checkForKey() {
    if (window.location.hash) {
      let hashes = window.location.hash.substring(1).split("&");
      const access_token = 0;

      let hashes_value = hashes.map(hash => hash.split("=")[1]);
      setToken(hashes_value[access_token]);
    }
  }

  // This will run on start
  useEffect(() => {
    checkForKey();
  }, [])

  return (
    <div className="App container">
      {token ?
        <Search token={token}/>
        :
        <div>

<h1>Welcome to Similarify</h1>
          <p>Powered by Spotify and LastFM, Similarify is an application that helps you discover the songs you like based on the songs you already like! </p>

          <h5>Similarify itself does not collect any data whatsoever.</h5>

          <h6>To get started, connect your Spotify Account</h6>
          <button className="btn btn-success" onClick={authenticateSpotify}>Login with Spotify</button>
        </div>
      }

      
    </div>
  );
}

export default App;
