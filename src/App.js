import { useEffect, useState } from 'react';
import Search from './Components/Search';
import SpotifyApi from './Libraries/SpotifyApi';
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
    <div className="App">

      
      <h1>Big Bug:</h1>
      <p>So, you have to click the Done button twice sometimes because the LastFM API sometimes return no songs.</p>
      
      {token ?
        <Search token={token}/>
        : <div>
          <h1>You are not authenticated</h1>
          <button onClick={authenticateSpotify}>Authenticate Yourself</button>
        </div>
      }

      
    </div>
  );
}

export default App;
