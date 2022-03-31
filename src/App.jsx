import { useEffect, useState } from 'react';
import Search from './Pages/Search';
import SpotifyApi from './utils/SpotifyApi';

// import listeningImage from './images/listening.png';
import { FaSpotify } from "react-icons/fa"
import Container from './Components/Container';
import Footer from './Components/Footer';

function App() {

  const handleLogin = () => {
    new SpotifyApi().authenticateUser();
  }

  return (
    <Container>

      {/* Header */}
      <div className='my-10'>
        <h1 className='text-6xl font-extrabold py-5'>
          Similarify
        </h1>
        <p className='text-black/60'>Powered by recommendations from Spotify, Similarify is an application that helps you discover the songs you like based on the songs you already like! </p>
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


      <Footer />

    </Container>
  );
}

export default App;
