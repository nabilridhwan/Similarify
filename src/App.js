import { useEffect, useState } from 'react';
import Search from './Search';
import SpotifyApi from './SpotifyApi';
// import logo from './logo.svg';
// import './App.css';

// Make a get request to https://accounts.spotify.com/authorize with the following parameters:
// client_id: your client id
// response_type: token
// redirect_uri: your redirect uri
// scope: user-read-private, user-read-email, playlist-read-private, playlist-modify-public, playlist-modify-private
// state: first-auth
// show_dialog: true


const Spotify = new SpotifyApi(null);

function App() {
  const [token, setToken] = useState(null);

  function authenticateSpotify() {
    Spotify.authenticateUser()
  }

  function checkForKey() {
    if (window.location.hash) {
      let hashes = window.location.hash.substring(1).split("&");
      const access_token = 0, token_type = 1, expires_in = 2, state = 3;

      let hashes_value = hashes.map(hash => hash.split("=")[1]);
      setToken(hashes_value[access_token]);
    }
  }

  useEffect(() => {
    checkForKey();
  }, [])

  return (
    <div className="App">
      {token ?
        <Search token={token}/>
        : <div>
          <h1>You are not authenticated</h1>
          <button onClick={authenticateSpotify}>Authenticate Thyself</button>
        </div>
      }

      
    </div>
  );
}

export default App;
