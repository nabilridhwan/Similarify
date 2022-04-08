// import listeningImage from './images/listening.png';
import { FaSpotify } from "react-icons/fa"
// import { SiReact, SiTailwindcss, SiFramer, SiSentry } from "react-icons/si"
import { Link } from "react-router-dom";
import Container from '../Components/Container';
import Footer from '../Components/Footer';

export default function Home() {
    return (
        <Container>

            {/* Header */}
            <div className='mt-20'>
                <h1 className='text-6xl font-extrabold my-2'>
                    Discover new songs 🎧🎶
                </h1>
                <p className='dark:text-white/60 text-black/60 text-lg'>Powered by recommendations from Spotify, Similarify is an application that helps you discover the songs you would like based on the songs you already like and compile them into a new playlist (or add them to an existing playlist!) </p>
            </div>


            <div className="my-5">
                <h1>
                    Read what's new <Link to="/changelog" className="underline text-pink-500">here</Link>.
                </h1>
            </div>


            <div className="my-10">
                <h1 className="text-2xl font-extrabold">
                    Discover in 5 simple steps!
                </h1>

                <p className='dark:text-white/50 text-black/50 mb-5 text-sm'>
                    Similarify does not store any of your data. It only uses your Spotify account to search and get recommendations.
                </p>

                <ol className='list-decimal text-sm space-y-2 ml-4'>
                    <li className='list-item'>
                        Log in with your Spotify Account
                    </li>

                    <li>
                        Search for songs that you already love and add it to your list. Alternatively, you can choose from your Liked songs and your playlists.
                    </li>

                    <li>
                        Confirm your list of added songs (and if you want to: adjust the parameters for each song to better suit your taste and get better recommendations!)
                    </li>

                    <li>
                        Click done and view your recommended songs and refresh the recommendations to get other recommendations.
                    </li>

                    <li>
                        Create a playlist out of your recommended songs (or add to an existing playlist of yours)!
                    </li>
                </ol>
            </div>

            <Link
                className="btn w-full justify-center flex flex-row items-center bg-green-500 text-white shadow-lg shadow-green-500/30 hover:bg-green-600 hover:shadow-none transition-all my-10"
                to="/authenticate">
                <FaSpotify className="mx-2" />
                Login with Spotify
            </Link>

            <p className="text-white/80 hidden text-center text-xs italic dark:block mb-10">
                You'll encounter a blinding white background by pressing the button above! Be careful!
            </p>


            <Footer />

        </Container>
    );

}