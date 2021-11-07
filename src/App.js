import { useEffect, useState } from 'react';
import Search from './Components/Search';
import SpotifyApi from './Libraries/SpotifyApi';
// import logo from './logo.svg';
import './App.css';

import listeningImage from './images/listening.png';
import { FaSpotify } from "react-icons/fa"

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

    console.log(process.env.REACT_APP_TEST);
  }, [])

  return (
    <div className="App container">
      {token ?
        <Search token={token} />
        :
        <div>

          <div className="row my-5 align-items-center">
            <div className="col-lg-6">

              <h1>Welcome to <br /> <span className="text-brand-color">Similarify</span></h1>
              <p>Powered by Spotify and LastFM, Similarify is an application that helps you discover the songs you like based on the songs you already like! </p>

              <div className="my-5">
                <h5>Similarify itself does not collect any data whatsoever.</h5>
                <p>To get started, connect your Spotify Account (Only for beta-testers)</p>

                <h6>Spotify's API Limit</h6>
                <p>Similarify is now requesting for quota extension request from Spotify so that other users can use this application! Similarify is currently only open to beta-testers (25 users).
                  If you are part of the beta-testing program, Login with your certified beta-tester Spotify account.</p>

                <button className="btn btn-success btn-lg" onClick={authenticateSpotify}>
                  <FaSpotify className="mx-2" />
                  Login with Spotify</button>
              </div>

            </div>

            <div className="col-lg-6">
              <img src={listeningImage} alt="a girl listening to music" className="img-fluid" />
            </div>
          </div>
        </div>
      }


      <footer class="align-items-center footer mt-auto py-3 text-center">
        <p class="m-0">Nabil. &copy; {new Date().getFullYear()}</p>
        <p className="m-0">Similarify utilizes the <a href="https://developer.spotify.com/documentation/web-api/">official Spotify API</a> and <a href="https://www.last.fm/api">official LastFM API</a>. We LOVE Spotify and LastFM, but we are not affiliated.</p>
        <p>Similarify is <a href="https://github.com/nabilridhwan/Similarify">Open Sourced</a></p>
      </footer>
    </div>
  );
}

export default App;
