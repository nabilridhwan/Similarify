import { useEffect, useState } from 'react';
import Search from './Components/Search';
import SpotifyApi from './Libraries/SpotifyApi';
// import logo from './logo.svg';

// import listeningImage from './images/listening.png';
import { FaSpotify } from "react-icons/fa"

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="container-md mx-auto h-screen font-mono">
      {token ?
        <Search token={token} />
        :
        <div>
          <h1 className='text-6xl font-bold py-5'>
            Similarify
          </h1>
          <p>Powered by Spotify and LastFM, Similarify is an application that helps you discover the songs you like based on the songs you already like! </p>

          <h5>Similarify itself does not collect any data whatsoever.</h5>
          <p>To get started, connect your Spotify Account (Only for beta-testers)</p>

          <h6>Spotify's API Limit</h6>
          <p>Similarify is now requesting for quota extension request from Spotify so that other users can use this application! Similarify is currently only open to beta-testers (25 users).
            If you are part of the beta-testing program, Login with your certified beta-tester Spotify account.</p>

          <button className="btn flex flex-row items-center bg-green-500 text-white shadow-lg shadow-green-500/30 hover:bg-green-600 hover:shadow-none transition-all" onClick={() => new SpotifyApi().authenticateUser()}>
            <FaSpotify className="mx-2" />
            Login with Spotify</button>
        </div>
      }


      {/* <footer class="text-white/50">
        <p class="m-0">Nabil. &copy; {new Date().getFullYear()}</p>
        <p className="m-0">Similarify utilizes the <a href="https://developer.spotify.com/documentation/web-api/">official Spotify API</a> and <a href="https://www.last.fm/api">official LastFM API</a>. We LOVE Spotify and LastFM, but we are not affiliated.</p>
        <p>Similarify is <a href="https://github.com/nabilridhwan/Similarify">Open Sourced</a></p>
      </footer> */}
    </div>
  );
}

export default App;
