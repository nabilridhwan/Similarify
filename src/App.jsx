import { useEffect, useState } from 'react';
import Search from './Pages/Search';
import SpotifyApi from './utils/SpotifyApi';

// import listeningImage from './images/listening.png';
import { FaSpotify } from "react-icons/fa"
import Container from './Components/Container';

function App() {

  const handleLogin = () => {
    new SpotifyApi().authenticateUser();
  }

  return (
    <Container>

      {/* Header */}
      <div className='my-10'>
        <h1 className='text-6xl font-bold py-5 text-green-500'>
          Similarify
        </h1>
        <p className='text-black/60'>Powered by Spotify and LastFM, Similarify is an application that helps you discover the songs you like based on the songs you already like! </p>
      </div>

      <ol className='list-decimal'>
        <li className='list-item'>
          Log in with your Spotify Account
        </li>

        <li>
          Search for songs that you already love and add it to your list
        </li>

        <li>
          Confirm your added songs
        </li>

        <li>
          Click done and view your favourite songs
        </li>
      </ol>

      <button className="btn w-full justify-center flex flex-row items-center bg-green-500 text-white shadow-lg shadow-green-500/30 hover:bg-green-600 hover:shadow-none transition-all my-10" onClick={handleLogin}>
        <FaSpotify className="mx-2" />
        Login with Spotify</button>


      <footer className="text-black/50 text-xs text-center">
        <p className="m-0">Nabil. &copy; {new Date().getFullYear()}</p>
        <p className="m-0">Similarify utilizes the <a href="https://developer.spotify.com/documentation/web-api/">official Spotify API</a> and <a href="https://www.last.fm/api">official LastFM API</a>. We LOVE Spotify and LastFM, but we are not affiliated.</p>
        <p>Similarify is <a href="https://github.com/nabilridhwan/Similarify">Open Sourced</a></p>
      </footer>

    </Container>
  );
}

export default App;
