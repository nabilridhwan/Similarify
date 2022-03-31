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
        <h1 className='text-6xl font-extrabold my-2'>
          Similarify
        </h1>
        <p className='text-black/60'>Powered by recommendations from Spotify, Similarify is an application that helps you discover the songs you like based on the songs you already like! </p>
      </div>

      <div className="my-10">
        <h1 className="text-2xl font-extrabold">
          How does it work?
        </h1>

        <p className='text-black/50 mb-5 text-sm'>
          Similarify does not store any of your data. It only uses your Spotify account to search and get recommendations.
        </p>

        <ol className='list-decimal text-sm space-y-2'>
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
            Click done and view your recommended songs!
          </li>

          <li>
            Create a playlist out of your recommended songs because the recommendations changes every time!
          </li>
        </ol>
      </div>

      <button className="btn w-full justify-center flex flex-row items-center bg-green-500 text-white shadow-lg shadow-green-500/30 hover:bg-green-600 hover:shadow-none transition-all my-10" onClick={handleLogin}>
        <FaSpotify className="mx-2" />
        Login with Spotify</button>


      <Footer />

    </Container>
  );
}

export default App;
